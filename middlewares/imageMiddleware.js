const multer = require('multer');
const jimp = require('jimp');
const uuid = require('uuid');

const multerOptions = {
    storage: multer.memoryStorage(), //Aonde salvar antes de processar. Nesse caso, na memória
    fileFilter: (req, file, next) => { //Filtro de arquivos permitidos
        const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
        //Se o arquivo está no formato permitido
        if(allowed.includes(file.mimetype)){
            next(null, true);
        }
        else{
            next({message: 'Formato inválido'}, false);
        }
    }
};

exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
    //Se não houver alteração na imagem
    if(!req.file){
        next();
        return;
    }

    const ext = req.file.mimetype.split('/')[1]; //Pegando extensão
    let filename = `${uuid.v4()}.${ext}`; //criando um nome com um hash+ext
    req.body.photo = filename;

    const photo = await jimp.read(req.file.buffer); //Imagem tá vindo da memória
    await photo.resize(800, jimp.AUTO); //Tamanho da imagem: 800xaltura automática
    await photo.write(`./public/media/${filename}`); //Salvar na pasta
    next();
};