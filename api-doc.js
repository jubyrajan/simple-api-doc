function isEmpty(s) {
	return (typeof s === 'undefined') || s == null || s.trim() === '';
}

function toggleApiDetail(apiId) {
	var apiDetail = document.getElementById(apiId);
	if(apiDetail) {
		if(isEmpty(apiDetail.style.display)) {
			apiDetail.style.display = 'none';
		} else {
			apiDetail.style.display = '';
		}
	}
}

function showApis(config, targetId) {
	var targetEl = null;
	if(targetId) {
		targetEl = document.getElementById(targetId);
	}
	if(!targetEl) {
		targetEl = document.body;
	}
	var apiCounts = {get: 0, post: 0, put: 0, delete: 0, total: 0};
	var html = '';
	for(var i = 0; i < config.categories.length; i++) {
		var category = config.categories[i];
		html += '<div class="api-category">';
		html += '<div class="api-category-header">' + category.title + '</div>';
		if(category.apis) {
			for(var j = 0; j < category.apis.length; j++) {
				var api = category.apis[j];
				var apiId = 'api-' + i + '-' + j;
				var httpMethod = api.httpMethod;
				apiCounts[httpMethod] ++;
				apiCounts.total ++;
				var description = api.description ? api.description : '';
				html += '<div class="' + httpMethod + '-section">';
				html += '<a class="api-method ' + httpMethod + '-method" href="javascript:toggleApiDetail(\'' + apiId + '\');">' + httpMethod + '</a> <a class="api-url" href="javascript:toggleApiDetail(\'' + apiId + '\');">' + api.url + '</a>';
				html += '<div class="api-description">' + description + '</div>';
				html += '<div id="' + apiId + '" class="api-detail" style="display:none;">';
				if(api.parameters && api.parameters.length > 0) {
					html += '<br/><div>Parameters</div>';
					html += '<table class="api-detail-table">';
					html += '<tr><th>Name</th><th>Type</th><th>Required</th><th>Default</th><th>Description</th></tr>';
					for(var k = 0; k < api.parameters.length; k++) {
						var param = api.parameters[k];
						html += '<tr><td>' + param.name + '</td><td>' + param.type + '</td><td></td><td></td><td>' + param.description + '</td></tr>';	
					} 
					html += '</table>';
				}
				if(api.responses && api.responses.length > 0) {
					html += '<br/><div>Responses</div>';
					html += '<table class="api-detail-table">';
					html += '<tr><th>Result</th><th>Response Code</th><th>Response</th></tr>';
					for(var k = 0; k < api.responses.length; k++) {
						var response = api.responses[k];
						var responseBody = JSON.stringify(response.responseBody, null, 4);
						html += '<tr><td>' + response.result + '</td><td>' + response.responseCode + '</td><td><pre>' + responseBody + '</pre></td></tr>';	
					} 
					html += '</table>';
				}
				html += '</div>';
				html += '</div>';
			}
		}
		html += '</div>';
	}
	html += '<br/><div><b>Total APIs: </b>' + apiCounts.total +
		', <b>GET: </b>' + apiCounts.get +
		', <b>POST: </b>' + apiCounts.post +
		', <b>PUT: </b>' + apiCounts.put +
		', <b>DELETE: </b>' + apiCounts.delete + '</div>';
	targetEl.innerHTML = html;
}
