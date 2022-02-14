const router = require('express').Router()
const fs = require('fs');
const uploadDir = './uploads/';

router.route('/').get((req, res) => {
    let files = _getFiles();
    res.send({
        status: true,
        files: files
    });
})

router.route('/upload-file').post(async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field to retrieve the uploaded file
            let uploadFile = req.files.uploadFile;

            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            uploadFile.mv(uploadDir + uploadFile.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: uploadFile.name,
                    mimetype: uploadFile.mimetype,
                    size: uploadFile.size
                }
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
})



router.route('/:fileName').delete((req, res) => {
    const fileName = req.params.fileName;
    try {
        _findFileAndDelete({ fileName: fileName });
        res.json({
            message: `File deleted!`,
            fileName: fileName
        });
    }
    catch (err) {
        res.status(400).json('Error: ' + err)
    };
})


_findFileAndDelete = (file) => {
    return fs.unlinkSync(uploadDir + file.fileName);
}

_getFiles = () => {
    return !fs.existsSync(uploadDir) ? [] :
        fs.readdirSync(uploadDir, { withFileTypes: true })
            .filter(item => !item.isDirectory())
            .map(item =>{
                return {name: item.name}
            }
                
            );
}

module.exports = router