import { Component, OnInit, AfterViewInit } from '@angular/core';

declare const PhotoSphereViewer;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'Photo-Sphere';

  ngOnInit() {
  }

  ngAfterViewInit() {
    const viewer = new PhotoSphereViewer.Viewer({
      panorama: 'assets/images/image1.jpg',
      container: 'viewer',
      loadingImg: 'https://photo-sphere-viewer.js.org/assets/photosphere-logo.gif',
      caption: 'Parc national du Mercantour <b>&copy; Damien Sorel</b>',

      plugins: [
        [PhotoSphereViewer.MarkersPlugin, {
          // list of markers
          markers: []
        }]
      ]
    });

    const markersPlugin = viewer.getPlugin(PhotoSphereViewer.MarkersPlugin);

    /**
     * Create a new marker when the user clicks somewhere
     */
    viewer.on('click', (e, data) => {
      if (!data.rightclick) {
        markersPlugin.addMarker({
          id: '#' + Math.random(),
          longitude: data.longitude,
          latitude: data.latitude,
          image: 'https://photo-sphere-viewer.js.org/assets/pin-red.png',
          width: 32,
          height: 32,
          anchor: 'bottom center',
          tooltip: 'Generated pin',
          data: {
            generated: true
          }
        });
      }
    });

    /**
     * Delete a generated marker when the user double-clicks on it
     * Or change the image if the user right-clicks on it
     */
    markersPlugin.on('select-marker', (e, marker, data) => {
      console.log(data);
      if (marker.data && marker.data.generated) {
        if (data.dblclick) {
          markersPlugin.removeMarker(marker);
        }
        // else if (data.rightclick) {
        //   markersPlugin.updateMarker({
        //     id: marker.id,
        //     image: 'https://photo-sphere-viewer.js.org/assets/pin-blue.png',
        //   });
        // }
      }
    });
  }
}
