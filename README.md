# SharePoint Additional Field Settings

SharePoint solution that adds some custom UI elements on field's edit pages for field properies that can be used in SharePoint, but has no UI and can be updated by code (for example, JSLink property).

![](https://sergeisnitko.github.io/repos/spf-fieldsettings/spf-fieldsettings.gif)


# What is this????
It was very sad to look at *fldedit.aspx*(Fields settings pages). This page doesn't updates by developers at all, but new functions cat be found. For example, *JSLink* field. To update this property of the field, you need to use custom code (Javascript, PowerShell). But sometimes it is node the easy to do. So, we decided to create this additional property on the filed edit page (in site columns and in fields of the list)
![](https://sergeisnitko.github.io/repos/spf-fieldsettings/01.png)

You just need to fill the value in JSLink field

![](https://sergeisnitko.github.io/repos/spf-fieldsettings/02.png)

and press ![](https://sergeisnitko.github.io/repos/spf-fieldsettings/03.png)



**Can be used in SharePoint Foundation 2013, SharePoint Server 2013, SharePoint Online, SharePoint Server 2016**

## How can we use it with SPMeta2 (M2)?
The sources contains the SPMeta2 model for deploying  the js file in _catalogs/masterpage folder of the solution. You can use this model in your own solution or deploy with [this solution](https://github.com/sergeisnitko/sp-cmd-deploy)

## How can I install it?

It is not enough to download js files or something. There is a CustomAction ScriptLink, that injects our script to each page of site collection. So you need to deploy this custom action any way 
And you just need yo execute last release application like this
```
fieldsettings.exe --url https://snitko.sharepoint.com/sites/demo --login demo@snitko.onmicrosoft.com --password MyPassword --deploy --spo
```

The command line params:
```
--url // the url of SharePoint site you want to execute you solution. It can be SharePoint 2013/SharePoint 2016/SharePoint Online. If you deploy to SharePoint Online, you need to add a key --spo in you command line 
--login // a login account to connect to SharePoint. If you execute your application on SharePoint 2013/SharePoint 2016, you can ignore this option. In this situation, the library would get credentials of current user 
--password // a password of the user, that you set in login param. You need to ignore it, if you ignore the *login* param
--domain //a domain of the user, that you set in login param if it is necessary. You need to ignore it, if you ignore the *login* param
--spo // You need to use the key if you want to execute your solution of SharePoint Online
--deploy // You need to use the key to deploy the solution
--retract // You need to use the key to retract the solution 
```


## How can we use in my own solution?
You can download the sources and copy files and model to your own project, update settings of the solution by your own. But there is an easy way - use the [nuget](https://www.nuget.org/packages/spf-fieldsettings/) for your solution in Visual Studio.
```
Install-Package spf-fieldsettings
```
## License
The library is made available under the MIT license. http://en.m.wikipedia.org/wiki/MIT_License

## **Have a nice use of this solution!**