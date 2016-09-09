using CommandLine;
using Microsoft.SharePoint.Client;
using SP.Cmd.Deploy;
using SPMeta2.BuiltInDefinitions;
using SPMeta2.CSOM.ModelHosts;
using SPMeta2.CSOM.Services;
using SPMeta2.Definitions;
using SPMeta2.Syntax.Default;
using SPMeta2.Syntax.Default.Utils;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Reflection;
using System.Security;
using System.Text;
using System.Threading.Tasks;

namespace spf_fieldsettings
{
    public static class Model
    {
        public static string Assets = @"SiteAssets";
        public static string SystemPath = Path.GetDirectoryName(Assembly.GetEntryAssembly().Location);

        public static UserCustomActionDefinition SettingLink()
        {

            return new UserCustomActionDefinition
            {
                Title = "SPFfieldsettings",
                Name = "SPFSfieldsettings",
                ScriptSrc = "~sitecollection/_catalogs/masterpage/spf/settings/spf.fieldsettings.js",
                Location = "ScriptLink",
                Sequence = 100
            };
        }

        public static SiteModelNode DeployModel()
        {
            return SPMeta2Model.NewSiteModel(site =>
            {
                site
                    .AddRootWeb(new RootWebDefinition(), RootWeb =>
                    {
                        RootWeb
                            .AddHostList(BuiltInListDefinitions.Catalogs.MasterPage, list =>
                            {
                                var FolderPath = Path.Combine(SystemPath, Assets);
                                if (Directory.Exists(FolderPath))
                                {
                                    ModuleFileUtils.LoadModuleFilesFromLocalFolder(list, FolderPath);
                                }

                            });

                    })
                    .AddUserCustomAction(SettingLink())
                    ;
            });
        }

        public static void ExecuteModel(this SiteModelNode Model, string url, ICredentials Credential = null)
        {
            SharePoint.Session(url, Credential, ctx =>
            {
                var provisionService = new CSOMProvisionService();
                provisionService.DeployModel(SiteModelHost.FromClientContext(ctx), Model);

            });
        }

        public static void Retract(SPDeployOptions options)
        {
            SharePoint.Session(options.url,options.Credentials, Ctx =>
            {
                var Site = Ctx.Site;
                var CustomActions = Site.UserCustomActions;
                Ctx.Load(CustomActions);
                Ctx.ExecuteQuery();
                var SettingsLinkAction = CustomActions.Where(x => x.Name == SettingLink().Name).FirstOrDefault();
                if (SettingsLinkAction != null)
                {
                    SettingsLinkAction.DeleteObject();
                    Ctx.ExecuteQuery();
                }
            });
        }
        public static void Deploy(SPDeployOptions options)
        {
            DeployModel().ExecuteModel(options.url, options.Credentials);
        }

    }
}
