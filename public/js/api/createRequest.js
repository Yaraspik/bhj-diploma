/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    // console.log(options)
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    xhr.responseType = 'json';

    const data = options.data;
    
    if (data) {
        if(options.method === 'GET') {
            let arParams = [];
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    const param = `${key}=${value}`;
                    const decodeURI = decodeURIComponent(param);
                    arParams.push(decodeURI);
                }
            }
            
            if (arParams.length != 0) {
                const strParams = arParams.join('&');
                options.url += '?' + strParams;
            }
        } else {
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const value = data[key];
                    formData.append(key, value);
                }
            }
            
        }
    }

    try {
        xhr.open(options.method, options.url);

        if (options.method != 'GET') {
            xhr.send(formData);
        } else {
            xhr.send();
        }
    } catch (err) {
        options.callback(err);
    }

    xhr.addEventListener('load', () => {
        if(xhr.DONE && xhr.status == 200) {
            if(xhr.response.success == true) {
                options.callback(null, xhr.response);
            }

            if(xhr.response.success == false) {
                options.callback(xhr.response.error);
            }
        }
    });
}