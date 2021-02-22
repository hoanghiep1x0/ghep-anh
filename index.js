const path = require('path');
const fs = require('fs');
const jimp = require('jimp');
//joining path of directory 
/*========== Phần setting=============*/


const _fileFrame = "frame/khung (154).png";
const _folderRoot = "images";
const _width = 720 || jimp.AUTO; // chiều rộng khung và ảnh hợp nhất
const _height = 720; // chiều rộng khung và ảnh hợp nhất

/*======== Brand ========*/

const _branDisplay = true;
const _brand = 'Hà Anh Fashion!';
const _brandTop = 0; // tên thương hiệu cách trên khung;
const _brandLeft = 50; // tên thương hiệu cách trái khung

/*======== logo ========*/
const _logoDisplay = true;
const _logo = "logo/logo.png";
const _logoSizeWith = 200; // logo chiều rộng
const _logoSizeHeight = 200; // logo chiều cao
const _logoTop = 50;
const _logoLeft = 50;


/*=============Code Phần Mềm *============*/
const directoryPath = path.join(__dirname, _folderRoot);

//passsing directoryPath and callback function
try {

    async function merge_image(_folderRoot, _file, _txt, _frame) {
        setTimeout(async () => {

            const font = await jimp.loadFont(jimp.FONT_SANS_32_BLACK)

            const parrot = await jimp.read(_frame)

            await jimp.read(_folderRoot + '/' + _file)
                .then(async image => {

                    image.resize(_width, _height)

                    // Do stuff with the image.
                    if (_logoDisplay) {
                        let _logoMerge = await jimp.read(_logo).then(logo => logo.resize(_logoSizeWith, _logoSizeHeight));
                        image.blit(_logoMerge, _logoTop, _logoLeft)
                    }


                    parrot.resize(_width, _height);

                    image.resize(_width, _height)


                    image.blit(parrot, 0, 0);


                    if (_branDisplay) {
                        image.print(
                            font,
                            _brandTop, // margin top
                            _brandLeft,// margin left
                            {
                                text: _txt,
                                alignmentX: jimp.HORIZONTAL_ALIGN_CENTER,
                                alignmentY: jimp.VERTICAL_ALIGN_MIDDLE
                            },
                            _width, // with 
                            _height, // height
                            (err, _image, { x, y }) => {
                                _image.writeAsync('./resuflt/' + _file)
                            }
                        )
                    } else {
                        image.writeAsync('./resuflt/' + _file)
                    }


                })
                .catch(err => {
                    console.log(err);
                    // Handle an exception.
                });

        }, 5000);
    }



    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        }
        //listing all files using forEach
        files.forEach(function (_file) {
            // Do whatever you want to do with the file
            merge_image(_folderRoot, _file, _brand, _fileFrame);

        });
    });

} catch (error) {
    console.log(error);
}


