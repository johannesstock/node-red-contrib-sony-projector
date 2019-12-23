module.exports = function(RED) {

    const {SdcpClient} = require('sony-sdcp-com')

    function SonyProjectorNode(config) {
        RED.nodes.createNode(this,config);
        this.projectorIp = config.projectorIp;
        this.projectorPort = parseInt(config.projectorPort);
        var node = this;
        var client;

        //init node and Track Status
        this.status({fill:"red",shape:"ring",text:"disconnected"});
        if (node.projectorIp && node.projectorPort) {
            client = SdcpClient({address: node.projectorIp, port: node.projectorPort})
        }
        else
        {
            node.send("Configuration Error. Please Check projectorIp or projectorPort in node config");
        }

        refreshNodeStatus();
        node.interval = setInterval(refreshNodeStatus, 60 * 1000);

         function refreshNodeStatus() {
            if (node.projectorIp && node.projectorPort) {
                client.getPower().then(status => {
                    node.status({fill:"green",shape:"dot",text:"connected"});
                }, err => {
                    node.status({fill:"red",shape:"ring",text:"disconnected"});
                    var msg = { payload:err}
                    node.send(msg);
                })
            }
        }

        node.on('input', function(msg) {
            
           
            if(msg.payload == "getpowerstate")
            {
                client.getPower().then(status => {
                var msg = { payload:status}
                node.send(msg);
                },
                err => {
                    var msg = { payload:err}
                    node.send(msg);
                }
                );   
            }

            if(msg.payload == "on")
            {
                client.setPower(true).then(status => {
                var msg = { payload:status}
                node.send(msg);
                },
                err => {
                    var msg = { payload:err}
                    node.send(msg);
                }
                );   
            }

            
            if(msg.payload == "off")
            {
                client.setPower(false).then(status => {
                var msg = { payload:status}
                node.send(msg);
                },
                err => {
                    var msg = { payload:err}
                    node.send(msg);
                }
                );   
            }

        });
    }
    RED.nodes.registerType("sony-projector",SonyProjectorNode);
}