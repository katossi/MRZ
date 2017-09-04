import { Component } from '@angular/core';

import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import Tesseract from 'tesseract.js'


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  srcImage: string;
  OCRAD: any;

  constructor(
    public navCtrl: NavController,
    public actionSheetCtrl: ActionSheetController,
    public loadingCtrl: LoadingController,
    public camera : Camera
  ) {}

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Choose Photo',
          handler: () => {
            this.getPicture(0); // 0 == Library
          }
        },{
          text: 'Take Photo',
          handler: () => {
            this.getPicture(1); // 1 == Camera
          }
        },{
          text: 'Demo Photo',
          handler: () => {
            this.srcImage = 'assets/img/demo.png';
          }
        },{
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(sourceType: number) {
    // You can check the values here:
    // https://github.com/driftyco/ionic-native/blob/master/src/plugins/camera.ts
    
    
    this.camera.getPicture({
      quality: 100,
      destinationType: 1, // DATA_URL
      sourceType,
      allowEdit: true,
      saveToPhotoAlbum: false,
      correctOrientation: true
    }).then((imageData) => {
      this.srcImage = `data:image/jpeg;base64,${imageData}`;
    }, (err) => {
      console.log(`ERROR -> ${JSON.stringify(err)}`);
    });
  }

  analyze() {
    
    //var text;

    //let loader = this.loadingCtrl.create({
    // content: 'Please wait...'
    //});
    //loader.present();


       
  Tesseract.create({
    langPath: "https://groups.google.com/group/tesseract-ocr/attach/855081ee89d03/ocrb.traineddata"
    }).recognize(document.getElementById('image'), "ocrb")  
    .progress((progress) => {
        console.log('progress', progress);
    })
    .then((tesseractResult) => {
       console.log(tesseractResult);
            });

    
    //(<any>window).OCRAD(document.getElementById('image'), text => {
     // loader.dismissAll();
     // alert(text);
    // console.log(text);
    //});
  }

  restart() {
    this.srcImage = '';
    this.presentActionSheet();
  }

}