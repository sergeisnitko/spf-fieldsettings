
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
