using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SP.Cmd.Deploy;

namespace spf_fieldsettings
{
    class Program
    {
        static void Main(string[] args)
        {
            SharePoint.CmdExecute(args, "SPF Extended settings for fields",
                options =>
                {
                    Model.Deploy(options);
                },
                options =>
                {
                    Model.Retract(options);
                },
                null
            );

            var t = "";
        }
    }
}
