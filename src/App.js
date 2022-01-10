import React, { Component } from 'react';
import { GithubPicker } from 'react-color';
import './App.css';
import IMG_PAINT from './paint.png';
import IMG_ERASE from './erase.png';
import IMG_CODE from './code.png';


class App extends Component {
  constructor(props) {
    super(props);

      this.BODY_HEX = `0x1000061100061200061300060e01060f01071001081101081201081301081401061501060d02060e02080f02081002081102081202081302081402081502081602060d03060e03080f03081003081103081203081303081403081503081603060c04060d04080e04080f04081004081104081204081304081404081504081604081704060c05060d05080e05080f05081005081105081205081305081405081505081605081705060c06060d06080e06080f06081006081106081206081306081406081506081606081706060c07060d07080e07080f07081007081107081207081307081407081507081607081707060c08060d08080e08080f08081008081108081208081308081408081508081608081708070c09060d09080e09080f09081009081109081209081309081409081509081609081709060d0a060e0a080f0a08100a08110a08120a08130a08140a08150a08160a060d0b060e0b080f0b08100b08110b08120b08130b08140b08150b08160b060e0c060f0c06100c08110c08120c08130c08140c08150c06100d06110d08120d08130d07140d06100e06110e07120e08130e08140e06100f06110f08120f08130f08140f060c10060d10060e10060f10061010061110081210081310081410060b11060c11080d11080e11080f11081011081111081211081311061411060a12060b12060c12080d12080e12080f12081012081112081212061312060213060313060413060513060a13060b13080c13080d13080e13060f13061013061113061213060114060214060314080414080514060614060714060914060a14060b14080c14080d14060015060115080215070315060415060515080615080715070815060915060a15080b15080c15060d15060016060116070416060516060616060716080816080916080a16080b16080c16060017060617060717060817060917070a17070b17060c1706`      
       
   this.state = {
      height: 24,
      width: 24,
      background: '#fff',
      cellColor: '#f44336',
      mouseDown: false,
      menuVisible: false,
      paint:false,
      erase:false,
      code: false,
      layer0: this.BODY_HEX
    };
    

    this.theme = [
        "#ff0040",
        "#131313",
        "#1b1b1b",
        "#272727",
        "#3d3d3d",
        "#5d5d5d",
        "#858585",
        "#b4b4b4",
        "#ffffff",
        "#c7cfdd",
        "#92a1b9",
        "#657392",
        "#424c6e",
        "#2a2f4e",
        "#1a1932",
        "#0e071b",
        "#1c121c",
        "#391f21",
        "#5d2c28",
        "#8a4836",
        "#bf6f4a",
        "#e69c69",
        "#f6ca9f",
        "#f9e6cf",
        "#edab50",
        "#e07438",
        "#c64524",
        "#8e251d",
        "#ff5000",
        "#ed7614",
        "#ffa214",
        "#ffc825",
        "#ffeb57",
        "#d3fc7e",
        "#99e65f",
        "#5ac54f",
        "#33984b",
        "#1e6f50",
        "#134c4c",
        "#0c2e44",
        "#00396d",
        "#0069aa",
        "#0098dc",
        "#00cdf9",
        "#0cf1ff",
        "#94fdff",
        "#fdd2ed",
        "#f389f5",
        "#db3ffd",
        "#7a09fa",
        "#3003d9",
        "#0c0293",
        "#03193f",
        "#3b1443",
        "#622461",
        "#93388f",
        "#ca52c9",
        "#c85086",
        "#f68187",
        "#f5555d",
        "#ea323c",
        "#c42430",
        "#891e2b",
        "#571c27"];
 


this.TRAIT_GLASSES_HEX = `0x0b04010c04010d04010e04010f04011004011104011204011304011404011504011604011704010c05010d05080e05010f05011005011105011205011305081405011505011605010c06010d06010e06080f06011006011206011306011406081506011606010d07010e07010f0701130701140701150701`;

console.log( this.hexToSvg( this.TRAIT_GLASSES_HEX ) );

  }
 

  componentWillMount(){
  
      this.seedCanvas( this.TRAIT_GLASSES_HEX);
  
  }

  hexToArr = (hex) => {
    if(hex.length === 0 || hex.length % 2 !== 0){
      throw new Error(`The string "${hex}" is not valid hex.`)
    }  
    if (hex.startsWith("0x")) hex = hex.slice(2);
    return new Uint8Array( hex.match(/.{1,2}/g).map( b => parseInt(b,16)));
  
  }

  hexToSvg = (hex) => {
      let rectangles = [];
     try{ 
    const arr = this.hexToArr( hex);
    console.log(arr);
       for (let i = 0 ; i < arr.length ; i+=3 ) {
                let index = i + this.state.width * (i+1);

                rectangles.push( <rect x={ ""+arr[i] } y={ ""+arr[(i+1)] } fill={ this.theme[ arr[i+2] ] } width="1px" height="1px" /> );
            }  
     } catch (err) {
        //TODO: toaster
        console.error(err);
     }  
      return ( <svg xmlns="http://www.w3.org/2000/svg"
                    id="pixel-svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 24 24" style={{shapeRendering: `crispedges`,backgroundColor:"rgba(138,112,179,0.2)"}} >
          { rectangles }  
  </svg>);

  } 

  seedCanvas = (hex) => {
    let _len = this.state.height * this.state.width;
    for( let y = 0; y < this.state.height ; y++ ) {
        for( let x=0; x< this.state.width ; x++) this.setPixelState( x , y , "-");
    }
     
    const arr = this.hexToArr( hex);
        for (let i = 0 ; i < arr.length ; i+=3 ) {
            console.log(`x : ${arr[i]} y: ${arr[i+1]} color:${this.theme[ arr[i+2] ]}`);
            this.setPixelState( arr[i] , arr[i+1], this.theme[ arr[i+2] ]);
            }  
  
  
  }
  
    
  // Cell color
  handleCellColor = (color) => {
    this.setState({ cellColor: color.hex });
  }

  // TODO: add "stamps", pre-set pixel art that can be added, e.g. stars or hearts
  handleCellColorOnClick = (x,y) => {
    if (!this.state.erase) this.setPixelState( x , y , this.state.cellColor );
    this.setState({ mouseDown: true });
  }

  handleMouseState = () => {
    this.setState({ mouseDown: false });
  }

  // Table background color
  handleBackgroundColor = (color) => {
    this.setState({ background: color.hex });
  };

  // Remove color
  handleColorRemove = ( x,y) => {
       this.setPixelState( x , y , "-" );
  }


  setPixelState = ( x , y , color ) => {
    const { pixels } = this.state;
    let p = {};
    p["p"+ ( x + ( y * this.state.width) )] = this.theme.indexOf(color);
      this.setState(p);
  }

  getPixelColor = ( x , y ) => {
        let k = "p"+ ( x + ( y * this.state.width) );
        let p = this.state[ k];
        if ( p === undefined || p === -1 ) return "unset";
        return this.theme[ p ];
  }

  onOver = (x, y) => {
      if (this.state.erase ) this.setPixelState( x , y , "-");
      else if (this.state.paint)
          this.setPixelState( x , y , this.state.cellColor );
  }

  // TODO: Separate into single components


  paintGrid = () => {
   let grid = [];
      for (let _y=0 ; _y < this.state.height ; _y++ ) {
          let gridRow = [];
          for (let _x=0 ; _x < this.state.height ; _x++ ) {
            gridRow.push( <div
                        style={{backgroundColor: this.getPixelColor(_x,_y) }}
                        onMouseDown={this.handleCellColorOnClick.bind(null,_x,_y)}
                        onMouseMove={this.state.mouseDown ? this.handleCellColorOnClick.bind(null,_x,_y) : null}
                        onMouseUp={this.handleMouseState}
                        onMouseLeave={this.handleMouseState}
                        onMouseOver={this.onOver.bind(null,_x,_y) }
                        onTouchStart={this.handleCellColorOnClick.bind(null,_x,_y) }
                        onTouchMove={this.state.mouseDown ? this.handleCellColorOnClick.bind(null,_x,_y) : null}
                        onTouchEnd={this.handleMouseState}
                        onDoubleClick={ e => this.setPixelState( _x , _y , "-" ) }
                        x={_x}
                        y={_y}
                className="pixel"></div> );
          }              
          grid.push( <div className="pixelRow" >{ gridRow }</div>);
      }
  return grid;    
  
  }


  pixelHex = () => {
    let _len = this.state.height * this.state.width;
    let s = '';
    for ( let i =0; i< _len; i++){
        let p = this.state["p"+i];
        if (p !== undefined && p !== null && p !== -1 ) {
            let x = i % 24;
            let y = parseInt( i / 24 );
            console.log( x + " " + y + " " + p );
            s += ( x < 16 ) ? '0'+x.toString(16) : x.toString(16);
            s += ( y < 16 ) ? '0'+y.toString(16) : y.toString(16);
            s += ( p < 16 ) ? '0'+p.toString(16) : p.toString(16);
        }
    }
    return "0x"+s;
  }


  render() {
    
                
    return (
        <div className="App">
            <div className="App-Content">
                <div className="canvasSettings">
                    <GithubPicker
                        triangle={"hide"}
                        width={`100%`}
                        onChangeComplete={this.handleCellColor}
                        color={ this.state.cellColor }
                        colors={ this.theme }
                    />
                </div>
                    <button type="button" className="canvasAction"
                        style={{opacity: (this.state.paint ? "1": "0.4")}}
                        onClick={ e => this.setState({ paint: !this.state.paint,erase:false}) } >
                            <img src={IMG_PAINT} />
                    </button>
                    <button type="button" className="canvasAction"
                        style={{opacity: (this.state.erase ? "1": "0.4")}}
                        onClick={ e => this.setState({ erase: !this.state.erase,paint:false}) } >
                        <img src={IMG_ERASE} />
                    </button>
                    <em>Double click to remove a color</em>
                <div className="Canvas" style={{position:`relative` }} >
                    <div id="pixel_canvas" style={{backgroundColor:`rgba(0,0,0,0.1)`}}>
                       { this.paintGrid() }
                    </div>
                { this.state.layer0 !== null && this.hexToSvg( this.state.layer0 ) }
                </div>
                <button type="button"
                    style={{opacity: (this.state.code ? "1": "0.4")}}
                    className="canvasAction" onClick={ e => this.setState({code:!this.state.code}) } ><img src={ IMG_CODE }/></button>{ this.state.code && <em
                        style={{ overflowWrap: `break-word`}} >{this.pixelHex()}</em> }
            </div>
        </div>
    );
  }
}

export default App;
