const request = require('request');
const fs = require("fs");
/* Create an empty file where we can save data */
/* Using Promises so that we can use the ASYNC AWAIT syntax */

const List = [
    'https://f25-zpg.zdn.vn/141437846858739371/05dbdee72a98d3c68a89.jpg',
    'https://f24-zpg.zdn.vn/2340987121565946601/c6f28ece7ab183efdaa0.jpg',
    'https://f24-zpg.zdn.vn/5392394273596321873/fadd92e666999fc7c688.jpg',
    'https://f24-zpg.zdn.vn/2077352585074507792/528f1b5fee20177e4e31.jpg',
    'https://f10.group.zp.zdn.vn/6410298887648699292/a6baa66b5314aa4af305.jpg',
    'https://f25-zpg.zdn.vn/8416708426726564231/5cae477ab2054b5b1214.jpg',
    'https://f11.group.zp.zdn.vn/7240978346560282274/d7dafa000f7ff621af6e.jpg',
    'https://f25-zpg.zdn.vn/8827241548596788547/8c5a4480b1ff48a111ee.jpg',
    'https://f9.group.zp.zdn.vn/2756288434958653872/6661e3bf16c0ef9eb6d1.jpg'
]

for(let i = 0; i< List.length; i++){
    dowload(List[i],'file-dowload-'+(i+1)+'.jpg');
}


async function dowload(url,name) {
    return await new Promise((resolve, reject) => {
        let stream = request({
            /* Here you should specify the exact link to the file you are trying to download */
            uri: url,
            headers: {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
                'Accept-Encoding': 'gzip, deflate, br',
                'Accept-Language': 'en-US,en;q=0.9,fr;q=0.8,ro;q=0.7,ru;q=0.6,la;q=0.5,pt;q=0.4,de;q=0.3',
                'Cache-Control': 'max-age=0',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36'
            },
            /* GZIP true for most of the websites now, disable it if you don't need it */
            gzip: true})
            .pipe(fs.createWriteStream(name))
            .on('finish', () => {
                console.log(`The file is finished downloading.`);
                resolve();
            })
            .on('error', (error) => {
                reject(error);
            })

    })
        .catch(error => {
            console.log(`Something happened: ${error}`);
        });

}

