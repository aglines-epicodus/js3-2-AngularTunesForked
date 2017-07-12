import { Component, Input, OnInit } from '@angular/core';
import { Album } from '../album.model';
import { AlbumService } from '../album.service';
import { FirebaseObjectObservable } from 'angularfire2/database';


@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css'],
  providers: [AlbumService]
})
export class EditAlbumComponent implements OnInit {
  @Input() selectedAlbum: FirebaseObjectObservable<any>;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
  }

  beginUpdatingAlbum(albumToUpdate){
    this.albumService.updateAlbum(albumToUpdate);
  }

  beginDeletingAlbum(albumToDelete): void {
    if(confirm('Are you sure you want to delete this item from the inventory?')){
      this.albumService.deleteAlbum(albumToDelete);
    }
  }
}
