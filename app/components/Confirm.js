import React from "react";
import Feedback from "./Feedback";

function ConfirmInfo(props) {
  //const { airport, aircraft, carrier, city, tax } = props.auxData;
  const { carrier, city } = props.flights.trips.data;
  const flightData = _.findWhere(props.flights.trips.tripOption, {
    id: props.selectedFlight,
  });

  const fare = flightData.pricing[0].fare[0];
  const carrierData = _.findWhere(carrier, { code: fare.carrier });

  const slice = flightData.slice[0];
  const stops = slice.segment.length;
  const origin = slice.segment[0].leg[0].origin;
  const destination = slice.segment[stops - 1].leg[0].destination;

  const timeDeparture = new Date(slice.segment[0].leg[0].departureTime);
  const timeArrival = new Date(slice.segment[stops - 1].leg[0].arrivalTime);
  // date departure
  const [w, d, m, ...rest] = timeDeparture.toUTCString().split(" ");

  const cityDeparture = _.findWhere(city, { code: fare.origin });
  const cityArrival = _.findWhere(city, { code: fare.destination });

  const ptext = _.map(props.formData.passengers, (val, key) => {
    return !isNaN(val) && val !== 0 ? `${val} ${key}` : "";
  });

  return (
    <section>
      <div className="title">
        <div>
          <small>{timeDeparture.toLocaleTimeString().replace(":00", "")}</small>
          <span>{origin}</span>
          <small>{cityDeparture.name}</small>
        </div>
        <span className="separator">
          <i className="zmdi zmdi-airplane"></i>
        </span>
        <div>
          <small>{timeArrival.toLocaleTimeString().replace(":00", "")}</small>
          <span>{destination}</span>
          <small>{cityArrival.name}</small>
        </div>
      </div>
      <div className="row">
        <div className="cell">
          <small>Passengers</small>
          <span>{_.compact(ptext).join(", ")}</span>
        </div>
        <div className="cell">
          <small>Person Name</small>
          {/* <span>{props.formData.fclass}</span> */}
        </div>
      </div>
      <div className="row">
        <div className="cell">
          <small>Departure</small>
          <span>{`${w} ${d} ${m}`}</span>
        </div>
        <div className="cell">
          <small>PNR</small>
          <span>{Math.floor(Math.random() * 1000000000 + 1)}</span>
        </div>
      </div>
      <div className="row">
        <div className="cell">
          <small>Airline</small>
          <span>{carrierData.name}</span>
        </div>
        <div className="cell"></div>
      </div>
    </section>
  );
}

class Confirm extends React.Component {
  componentDidMount() {
    this.props.setCurrentPath(location.pathname);
  }

  render() {
    const isEmpty = _.isEmpty(this.props.flights);
    return (
      <div className="content">
        <div className="ticket">
          {!isEmpty ? (
            <ConfirmInfo {...this.props} />
          ) : (
            <Feedback text="No Data" />
          )}
        </div>
      </div>
    );
  }
}

export default Confirm;
