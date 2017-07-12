import { Injectable } from '@angular/core';
import { Album } from './album.model';
// import { ALBUMS } from './mock-albums';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

@Injectable()
export class AlbumService {

  albums: FirebaseListObservable<any[]>;

  constructor(private database: AngularFireDatabase) {
    this.albums = database.list('albums');
    }

  getAlbums() {
    return this.albums;
  }

  addAlbum(newAlbum: Album) {
    this.albums.push(newAlbum);
  }

  getAlbumById(albumId: string): FirebaseObjectObservable<any> {
    return this.database.object('albums/' + albumId);
  }

  updateAlbum(localUpdatedAlbum: any){
    var albumEntryInFirebase = this.getAlbumById(localUpdatedAlbum.$key);
    albumEntryInFirebase.update({title: localUpdatedAlbum.title,
                                artist: localUpdatedAlbum.artist,
                                description: localUpdatedAlbum.description });
  }

  deleteAlbum(localAlbumToDelete: any): void {
    const albumEntryInFirebase: FirebaseObjectObservable<any> = this.getAlbumById(localAlbumToDelete.$key);
    albumEntryInFirebase.remove();
  }

}


// for (var i = 0; i <= ALBUMS.length - 1; i++) {
//   if (ALBUMS[i].id === albumId) {
//     return ALBUMS[i];
//   }
// }
