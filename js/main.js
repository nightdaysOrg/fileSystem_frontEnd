(function (w) {

    w.http = {
        httpRequest(url, param) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('post', url, true);
                if (param instanceof FormData) {
                    xhr.send(param);
                } else {
                    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                    xhr.send(JSON.stringify(param));
                }

                xhr.onload = function (e) {
                    resolve(JSON.parse(xhr.response));
                }
            });
        },

        httpRequestFileUpload(url, param) {
            return new Promise((resolve, reject) => {
                let xhr = new XMLHttpRequest();
                xhr.open('post', url, true);
                let fd = new FormData();

                xhr.send(JSON.stringify(param));
                xhr.onload = function (e) {
                    resolve(JSON.parse(xhr.response));
                }
            });
        },

        httpRequestJQuery(url, param) {
            return new Promise((resolve, reject) => {
                let options = {
                    url: url,
                    method: 'post',
                    data: param,
                    success: function (result) {
                        resolve(result);
                    },
                    error: function (error) {
                        reject(error);
                    }
                };
                $.ajax(options);
            });
        },

        httpRequestFromJQuery(url, param) {
            return new Promise((resolve, reject) => {

                var xhr = new XMLHttpRequest();

                xhr.open('post', url, true);

                xhr.onload = function () {
                    console.log('success');
                }

                xhr.onerror = function () {
                    console.log('error');
                }


                try {

                    xhr.send('name=123');
                } catch (e) {

                    if (callback) {
                        throw e;
                    }
                }
            });
        }
    };

    // w.serviceUrl = 'https://www.nightdays.net:8972/fileSystem';
    w.serviceUrl = 'http://localhost:8080/fileSystem';

    w.fileDealer = {
        getFileList(dir) {
            let param = {};
            if (dir) {
                param.dir = dir;
            }
            return http.httpRequest(`${serviceUrl}/getFileList`, param);
            // return http.httpRequestJQuery(`${serviceUrl}/getFileList`, param);
        },
        uploadFile(param) {
            return http.httpRequest(`${serviceUrl}/uploadFile`, param);
        },
        deleteFile(param) {
            return http.httpRequest(`${serviceUrl}/deleteFile`, param);
        }
    }


})(window);