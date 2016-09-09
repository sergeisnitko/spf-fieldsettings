
var SpfFieldSettings = function () {
	var self = this;
	var defaultJSLink = "clienttemplates.js";

	this.getSettings = function (callback) {
		var FieldName = GetUrlKeyValue("Field") || GetUrlKeyValue("field") || GetUrlKeyValue("FIELD");
		var ListId = GetUrlKeyValue("List") || GetUrlKeyValue("list") || GetUrlKeyValue("LIST");
		self.ctx = new SP.ClientContext();
		var web = self.ctx.get_web();

		if (ListId) {
			var lists = web.get_lists();
			self.targetList = lists.getById(decodeURIComponent(ListId));
			var fields = self.targetList.get_fields();
		} else {
			var fields = web.get_fields();
		}
		self.targetField = fields.getByInternalNameOrTitle(FieldName);

		self.ctx.load(self.targetField);
		self.ctx.executeQueryAsync(
			function (data) {
				if (callback)
					callback();
			},
			function (sender, args) {
				self.Error('Getted settings', args);
			}
		);
	};
	this.SetDOMJSLink = function () {
		var idJSLink = document.getElementById("idJSLink");
		if (idJSLink) {
			var JSLink = self.targetField.get_jsLink();

			if (JSLink || JSLink.toLowerCase() == self.defaultJSLink) {
				idJSLink.value = JSLink;
			}
		}
	};
	this.saveJSLink = function () {
		var idJSLink = document.getElementById("idJSLink");
		if (idJSLink) {
			self.targetField.set_jsLink(idJSLink.value || self.defaultJSLink);
		}

	};
	this.saveSettings = function (callback) {
		self.saveJSLink();
		self.targetField.update();
		self.ctx.executeQueryAsync(
			function (data) {
				location.reload();
				if (callback)
					callback();
			},
			function (sender, args) {
				self.Error('Saving settings', args);
			}
		);
	};
	this.createDOMElements = function () {
		var DescElem = document.querySelector("textarea#idDesc");
		var DescTR = DescElem.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
		var JSLinkElem = self.createJSLinkElem();
		DescTR.parentNode.insertBefore(JSLinkElem, DescTR.nextSibling);
	};
	this.createJSLinkElem = function () {
		var JSLinkElem = document.createElement("tr");
		JSLinkElem.innerHTML = '<td nowrap="nowrap"></td><td class="ms-descriptiontext ms-formdescriptioncolumn-wide" valign="top"></td><td class="ms-authoringcontrols" width="10">&nbsp;</td><td class="ms-authoringcontrols"><label>JSLink:</label><font size="3">&nbsp;</font><br><table border="0" cellspacing="1"><tbody><tr><td colspan="2"><input class="ms-input" type="text" name="JSLink" id="idJSLink" maxlength="255" size="30" value=""><input type="button" value="Apply" onclick="SpfFieldSettingsEx.saveSettings();"/></td></tr></tbody></table></td>';

		return JSLinkElem;
	};
	this.Error = function (text, args) {
		console.log(text + args.get_message() + '\n' + args.get_stackTrace());
	};

	this.init = function () {
	    var href = window.location.href.toLowerCase();
	    if ((href.indexOf("_layouts/15/fldedit.aspx") != -1) ||
            (href.indexOf("_layouts/15/fldeditex.aspx") != -1)) {
			var ExecuteFunction = function () {
				EnsureScriptFunc("sp.js", "SP.ClientContext", function () {
					self.getSettings(function () {
						self.createDOMElements();
						self.SetDOMJSLink();
					});
				});
			};
			if (_spBodyOnLoadCalled) {
				ExecuteFunction();
			} else {
				_spBodyOnLoadFunctions.push(ExecuteFunction);
			}

		}
	};
	self.init();
};

(function () {
	window.SpfFieldSettingsEx = new SpfFieldSettings();
})();
