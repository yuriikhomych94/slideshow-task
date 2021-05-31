import { CurrencyPipe } from '@angular/common';
import { CursorError } from '@angular/compiler/src/ml_parser/lexer';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PresentationItem } from 'src/app/interface/presentation.interface';
import { SlideService } from 'src/app/service/slide.service';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {

  @ViewChild('videoContainer') videoContainer: ElementRef;
  @ViewChild('imageContainer') imageContainer: ElementRef;

  urlImage: string = "https://test.onsignage.com/PlayerBackend/creative/get/";
  playlist: Array<PresentationItem> = [];
  currentIndex: number = 0;
  status: boolean = true;


  constructor(private slideSerive: SlideService) { }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.slideSerive.getData().subscribe((response) => {
      for (let i = 0; i < response.playlists.length; i++) {
        for (let j = 0; j < response.playlists[i].playlistItems.length; j++) {
          const fileName = this.urlImage + response.playlists[i].playlistItems[j].creativeKey;
          const duration = response.playlists[i].playlistItems[j].duration;
          this.playlist.push({
            url: fileName,
            duration: duration
          })
        }
      }
      this.startPlay(0);
    })
  }

  startPlay(index: number) {
    let item = this.playlist[index];
    this.playItem(item)
    setTimeout(() => {
      if (this.playlist.length == this.currentIndex) {
        this.currentIndex = 0;
      }
      this.startPlay(this.currentIndex)
    }, item.duration * 1000)
  }

  playItem(item: PresentationItem) {
    this.currentIndex++;
    const extenstion = item.url.slice(-3);
    this.status = extenstion == "jpg"
    setTimeout(() => {
      if (this.status) {
        this.imageContainer.nativeElement.src = item.url;
      } else {
        this.videoContainer.nativeElement.src = item.url;
        this.videoContainer.nativeElement.muted = false;
        this.videoContainer.nativeElement.play();
      }
    }, 300)
  }
}
