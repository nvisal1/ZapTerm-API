import * as http from 'http';
import * as terminal from 'web-terminal';

export function initTerminal() {
    const terminalServer = http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/plain'});
        res.end('Hello World\n');
    });

    terminalServer.listen(1337);
    console.log('Server running at http://127.0.0.1:1337/');

    terminal(terminalServer);
    console.log('Web-terminal accessible at http://127.0.0.1:1337/terminal');
}

