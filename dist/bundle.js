import React from 'react';
import StudiosList from './studios/studiosList';
import {StagesList} from './stages/stagesList';
import Nav from './nav';
import Ticket from './ticket/ticket';

const studios = [
  {
    name: 'Studio1',
    'img': 'http://icons.iconarchive.com/icons/ncrow/mega-pack-2/256/Pinnacle-Studio-icon.png'
  },
  {
    name: 'Studio2',
    'img': 'http://icons.iconarchive.com/icons/ncrow/mega-pack-2/256/Pinnacle-Studio-icon.png'
  }
];


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tickets: []
    };
  }
  componentDidMount() {
    fetch('/api/tickets', {
      method: 'GET',
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      }
    })
    .then(promise => {
      return promise.json();
    })
    .then(models => {
      this.setState({tickets: models});
    })
    .catch(err => {
      //console.log(err,'error!!!!');
    })
  }
  render() {
    return(
      <div>
        <Nav />
        <h1>stageUp - Track your order stages with ease!</h1>
        <Ticket
          createTicket={this.createTicket.bind(this)}
        />
        <StagesList tickets={this.state.tickets} />
      </div>
    );
  }
  createTicket(ticket) {
    //console.log('our object',ticket);
    this.componentDidMount();
  }
}
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

ReactDOM.render(<App />, document.getElementById('app'));


import React from 'react';

const style = {
  display: 'block',
  marginLeft: '60%'
};

export default class Nav extends React.Component {
  render() {
    return(
      <nav style={style}>
        <button>Studios</button>
        <button onClick={this.handleLogOut.bind(this)} ref='logOut'>Log Out</button>
      </nav>
    );
  }
  handleLogOut(e) {
    // console.log(this.refs.logOut);
  }
}
import _ from 'lodash';
import React from 'react';
import {StagesListItem} from './stagesListItem';

const style = {
  'backgroundColor': 'grey',
  'cursor': 'pointer',
  'height': '100px',
  'width': '100px',
  'display': 'inline-table',
  'padding': '2em',
  'border': '2px solid black',
  'textAlign': 'center'
};

export class StagesList extends React.Component {
  render() {

    if (this.props.tickets.length !== 0) {
      return(
        <div id='stage' style={{'padding': '5em'}}>
          <div style={style}>
            <span>Image Match</span>
            {_.map(this.props.tickets, (ticket, index) => {
              return <StagesListItem key={index} ticket={ticket} />
            })}
          </div>
          <div style={style}>
            <span>DP2</span>
          </div>
          <div style={style}>
            <span>Color Correction</span>
          </div>
          <br />
          <div style={style}>
            <span>Packaging</span>
          </div>
          <div style={style}>
            <span>Printing</span>
          </div>
          <div style={style}>
            <span>ID Laminate</span>
          </div>
          <br />
          <div style={style}>
            <span>Done</span>
          </div>
          <div style={style}>
            <span>Invoiced</span>
          </div>
        </div>
      );
    } else {
      return(<div>Loading...</div>)
    }
  }
}
import React from 'react';

const style = {
  height: '5px',
  width: '70px',
  backgroundColor: '',
  padding: '1em',
  display: 'inline-block',
  fontSize: '9px',
  fontWeight: 'bold',
  fontFamily: 'sans-serif'
};

const label = {
  option: ''
};

export class StagesListItem extends React.Component {
  render() {
    style.backgroundColor = this.props.ticket.rush === true ? '#ce2323' : '#bbb';
    label.option = this.props.ticket.group === true ? ' G' : this.props.ticket.comp === true ? ' C' : '';
    return (
      <li style={style} id={this.props.ticket.id}>{this.props.ticket.name + label.option}</li>
    );
  }
}
import React from 'react';

export default class StudiosHeader extends React.Component {
  render() {
    return(

        <thead>
          <tr>
            <th>Tasks</th>
            <th>Actions</th>
          </tr>
        </thead>
    )
  }
}
import _ from 'lodash';
import React from 'react'
import StudiosHeader from './studiosHeader'
import StudiosListItem from './studiosListItem'

export default class StudiosList extends React.Component {
  renderItems() {
    return _.map(this.props.studios, (studio, index) => <StudiosListItem key={index} {...studio} />);
  }
  render() {
    return(
      <table>
        <StudiosHeader />
        <tbody>
          {this.renderItems()}
        </tbody>
      </table>
    )
  }
}
import React from 'react';

export default class StudiosListItem extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.name}</td>
        <td>
          <button>Edit</button>
          <button>Delete</button>
        </td>
      </tr>
    )
  }
}
import React from 'react';

const style = {
  height: '150px',
  width: '200px',
  backgroundColor: '#bbb',
  padding: '3em',
  marginLeft: '15%'
};

export default class Ticket extends React.Component {
  render() {
    return(
      <div style={style}>
        <form onSubmit={this.handleCreate.bind(this)}>
          Order ID
          <input type='text' placeholder='School Name ID#' ref='createInput'/>
          Order Date<input type='date' ref='createDate1'/>
          Makeup Date<input type='date' ref='createDate2'/>
          <br />
          Group<input type='radio' ref='createGroup'/>
          Composite<input type='radio' ref='createComp'/>
          <br />
          <span style={{color: 'red'}}>Rush</span><input type='radio' ref='createRush'/>
          <br />
          <button>Add Ticket</button>
        </form>

      </div>
    )
  }
  handleCreate(e) {
    e.preventDefault();

    fetch('/api/tickets', {
      headers:{
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        {
          name : this.refs.createInput.value,
          group: this.refs.createGroup.checked,
          comp : this.refs.createComp.checked,
          rush : this.refs.createRush.checked
        }
      )
    })
    .then( body => {
      this.props.createTicket(body);
    })

    // resetting fields
    this.refs.createInput.value = '';
    this.refs.createDate1.value = '';
    this.refs.createDate2.value = '';
    this.refs.createGroup.checked = false;
    this.refs.createComp.checked = false;
    this.refs.createRush.checked = false;

  }
}