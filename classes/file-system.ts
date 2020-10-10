import { FileUpload } from "../interfaces/file-upload";
import path from 'path';
import fs from 'fs';
import uniqid from 'uniqid';

export default class FileSystem {
    constructor() {};

    guardarImagenTemporal(file: FileUpload, userId: string) {
        return new Promise((resolve, reject) => {
            // crear carpetas
            const path = this.crearCarpetaUsuario(userId);

            // nombre archivo
            const nombreArchivo = this.generarNombreUnico(file.name);
            console.log(nombreArchivo);

            // mover archivo del temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err: any) => {
                if (err) {
                    reject(err);    
                } else {
                    resolve();
                }
            });
        });
    }

    private generarNombreUnico(nombreOriginal: string) {
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        const idUnico = uniqid();

        return `${idUnico}.${extension}`;
    }

    private crearCarpetaUsuario(userId: string) {
        const pathUser = path.resolve(__dirname, '../uploads/', userId );
        const pathUserTemp = pathUser + '/temp';

        const exist = fs.existsSync(pathUser);
        if(!exist) {
            fs.mkdirSync(pathUser);
            fs.mkdirSync(pathUserTemp);
        }
        return pathUserTemp;
    }

    imagenesDeTempHaciaPost(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve(__dirname, '../uploads/', userId, 'posts');

        if(!fs.existsSync(pathTemp)) {
            return [];
        }

        if(!fs.existsSync(pathPost)) {
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            fs.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });

        return imagenesTemp;
    }

    private obtenerImagenesEnTemp(userId: string) {
        const pathTemp = path.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs.readdirSync(pathTemp) || [];
    }

    getPhotoUrl(userId: string, img: string) {
        // path posts
        const pathPhoto = path.resolve(__dirname, '../uploads/', userId, 'posts', img);
        // check if image exists
        const exists = fs.existsSync(pathPhoto);
        if(!exists) {
            return path.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathPhoto;
    }
}