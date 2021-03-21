import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { ChatMessage } from '../models/chatMessage.model';
import { environment } from '../../environments/environment';
import { MessagePackHubProtocol } from '@aspnet/signalr-protocol-msgpack';

const WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS = 2000;

@Injectable()
export class SignalRService {
  //foodchanged = new Subject();
  //messageReceived = new Subject<ChatMessage>();
  connectionId = new Subject<string>();
  accessToken = new Subject<string>();
  connectionEstablished = new Subject<Boolean>();
  private hubConnection: HubConnection;

  constructor() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection();                                                                       
  }

  getConnectionId() {
    this.hubConnection.invoke('GetConnectionId');
  }

  initializeNewConnection() {
    this.createConnection();
    this.registerOnServerEvents();
    this.startConnection(); 
  }

  getAccessToken() {
    this.hubConnection.invoke('GetAccessToken');
  }

  // getQrCode(string) {
  //   return environment.apiBaseUrl + '/websigin/' + string;
  // }

  public createConnection() {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(environment.apiBaseUrl + '/qrcode')
      .withHubProtocol(new MessagePackHubProtocol())
      .build();
  }

  private startConnection() {
    //setTimeout(() => {
      this.hubConnection.start().then(() => {
        console.log('Hub connection started');
        this.connectionEstablished.next(true);
      });
    //}, WAIT_UNTIL_ASPNETCORE_IS_READY_DELAY_IN_MS);
  }

  private registerOnServerEvents(): void {
    // this.hubConnection.on('FoodAdded', (data: any) => {
    //   this.foodchanged.next(data);
    // });

    // this.hubConnection.on('FoodDeleted', (data: any) => {
    //   this.foodchanged.next('this could be data');
    // });

    // this.hubConnection.on('FoodUpdated', (data: any) => {
    //   this.foodchanged.next('this could be data');
    // });

    // this.hubConnection.on('Send', (data: any) => {
    //   this.messageReceived.next(data);
    // });

    this.hubConnection.on('ReceiveConnectionId', (data: string ) => {
      this.connectionId.next(data);
    });
    this.hubConnection.on('ReceiveAccessToken', (data: string ) => {
      this.accessToken.next(data);
    });
  }
}
