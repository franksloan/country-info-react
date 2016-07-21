import $ from 'jquery'

let AjaxHelper = (url, type, data, callback) => {
		$.ajax({
		    url: 'http://localhost:5001/' + url,
		    dataType: 'json',
		    type: type,
		    data: data,
		    cache: false,
		    success: function(data) {
		      callback(data);
		    },
		    error: function(xhr, status, err) {
		      console.error(this.props, status, err.toString());
		    }
		});
}

export default AjaxHelper