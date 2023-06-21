const options = {
    headers: {
        securityCode: 'security_code',
    },
};

const url = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/download-quality-document/110';

fetch(url, options)
    .then(res => {
        const headers = res.headers.get('file_example.txt');
        return res.blob();
    })
    .then(blob => {
        var file = window.URL.createObjectURL(blob);
        window.location.assign(file);
    });
