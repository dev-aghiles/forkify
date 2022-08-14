import { TIME_OUT_SEC } from './config.JS';
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPro = fetch(
      url,
      uploadData && {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }
    );
    const response = await Promise.race([fetchPro, timeout(TIME_OUT_SEC)]);
    const datas = await response.json();
    if (!response.ok) throw new Error(`${datas.message} (${response.status})`);
    return datas;
  } catch (err) {
    throw err;
  }
};
