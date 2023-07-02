// import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

// @WebSocketGateway()
// export class ChatGateway {
//   @WebSocketServer()
//   server;

//   @SubscribeMessage('message')
//   handleMessage(@MessageBody() message: string): void {
//     this.server.emit('message', message);
//   }
// }
import { MessageBody,SubscribeMessage,WebSocketGateway, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class MyGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  connectedClients: Set<string> = new Set<string>();

  handleConnection(client: Socket) {
    // Store the connected socket ID
    this.connectedClients.add(client.id);
  }

  sendDataToClients(data: any) {
    // Iterate through connected socket IDs and send data to each client
    this.connectedClients.forEach((socketId: string) => {
      this.server.to(socketId).emit('data', data);
    });
  }
  @SubscribeMessage('message')
  handleMessage(@MessageBody() message: string): void {
    
    this.server.emit('message', message);
  }
}
  