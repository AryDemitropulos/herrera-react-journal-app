import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/journal/fileUploads';

cloudinary.config({
  cloud_name: 'dpfm6nnpa',
  api_key: '193888588591476',
  api_secret: 'g_w4T3fsoD-Fr_70zYEylzxpBvE',
  secure: true,
});

describe('Pruebas en fileUpload', () => {
  test('Debe de subir el archivo correctamente a Cloudinary', async () => {
    const imageUrl =
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSguPDWTxjmOwEBcDJNkHIcydqPC_euSwSOWw&usqp=CAU';
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'foto.jpg');

    const url = await fileUpload(file);
    
    expect(typeof url).toBe('string');
    const segment = url.split('/');
    const imageId = segment[segment.length - 1].replace('.png', '');
    const t = await cloudinary.api.delete_resources(['journal/' + imageId]);
  });

  test('debe retornar error si archivo es null', async () => {
    try {
      await fileUpload();
    } catch (e) {
      expect(e.message).toBe('No tenemos ningun archivo a subir');
    }
  });

  test('debe retornar error si falla subida de archivo', async () => {
    const file = new File([], 'foto.jpg');
    try {
      await fileUpload(file);
    } catch (e) {
      expect(e.message).toBe('No se pudo subir imagen');
    }
  });
});
