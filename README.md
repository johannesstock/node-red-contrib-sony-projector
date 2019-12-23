# node-red-contrib-sony-projector
Node Red Node for controlling Sony Projectors via PJ Talk

## Tested with

* VPL-VW270ES

Also See <a href="sony-sdcp-com">https://github.com/vokkim/sony-sdcp-com</a> for other supported Projectors since this Project relys on that library.


## Installation

```bash
npm install node-red-contrib-sony-projector
```

## Configuration


### Projector
- Enable Remote Management
- Define Static IP (Recommended)
- Configure PJ Talk in in Web Interface (Community = SONY, Port, Host Address = Node Red Server Address)

### Node Red
You need to specifiy the following settings in the Node configuration:
- projectorIp: IP Address of the Projector
- projectorPort: Port of the Projects SDCP Server. Default: 53484 - can be configured in the Projector Web Interface


## Usage

You can send the following commands as a text string in <code>msg.payload</code>

* getpowerstate (returns: OFF, WARMING, ON, COOLING)
* on
* off
* more to come

See <a href="examples/">directory </a>for an example of all the commands.

## Credits
Thank you vokkim for providing <a href="sony-sdcp-com">https://github.com/vokkim/sony-sdcp-com</a> as the basis library for this Project.

## Contribute
Issues and pull requests welcome

## License
MIT