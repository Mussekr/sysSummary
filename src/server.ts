import { createServer, Server } from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import getKuhlerData from './kuhlerData';

export default class AppServer {
    public static readonly PORT: number = 8080;
    private app: express.Application;
    private server: Server;
    private io: SocketIO.Server;
    private port: string | number;

    constructor() {
        this.createApp();
        this.config();
        this.createServer();
        this.sockets();
        this.listen();
        this.loopKuhler();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private createApp(): void {
        this.app = express();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private config(): void {
        this.port = process.env.PORT || AppServer.PORT;
    }

    private sockets(): void {
        this.io = socketIo(this.server);
    }

    private listen(): void {
        this.server.listen(this.port, () => {
            console.log('Running server on port %s', this.port);
        });

        this.io.on('connect', (socket: any) => {
            console.log('Connected client on port %s.', this.port);
            socket.on('kuhler', (m) => {
                const kuhlerData = getKuhlerData();
                console.log('[server](message): %s', JSON.stringify(m));
                this.io.emit('kuhler', kuhlerData);
            });

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }

    private loopKuhler(): void {
        setInterval(() => {
            this.io.emit('kuhler', getKuhlerData());
        }, 1000);
    }
}
