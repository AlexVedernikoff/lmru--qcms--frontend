export function downloadFile(id: number) {
    const headers = {
        headers: {
            securityCode: 'security_code',
        },
    };

    let fileName: string | null | undefined = '';

    const hostUrl = 'https://orchestrator-qcms-test-stage.platformeco.lmru.tech/v1/download-quality-document/';

    fetch(`${hostUrl}${id}`, headers)
        .then(response => {
            if (String(response.status)[0] === '4') {
                console.log(`Ошибка! Файла с id = ${id} не существует.`);
                alert(`Ошибка! Файла с id = ${id} не существует.`);
                return;
            }

            fileName = response.headers.get('Content-Disposition')?.split("'").slice(-1)[0];
            return response.blob();
        })
        .then(blob => {
            if (blob != null) {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = fileName as string;
                document.body.appendChild(a);
                a.click();
                a.remove();
            }
        });
}
