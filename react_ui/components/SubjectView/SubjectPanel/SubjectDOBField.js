import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as SubjectActions from '../../../actions/subject';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class SubjectDOBField extends React.Component {

  constructor(props) {
    super(props);
    this.state={value: this.getDateValue()};
    this.onChange = this.onChange.bind(this);
  }

  getDateValue() {
    if (this.props.value == '') {
      return ''
    }
    var date = this.props.value;
    var splitDate = date.split('-');
    var day = splitDate[2];
    let dateClass = new Date(date);
    dateClass.setDate(day);
    return dateClass;
  }

  onChange(e) {
    const { dispatch } = this.props;
    let date= moment(e);
    this.setState({value: e});
    // Check to see if we're editing an existing subject
    if (!this.props.new) {
      // Changing the input fields should update the state of the active subject
      const sub = this.props.subject;
      sub.dob = date.format('YYYY-MM-DD');
      dispatch(SubjectActions.setActiveSubject(sub));
    } else {
      const sub = this.props.newSubject;
      sub.dob = date.format('YYYY-MM-DD');
    }
  }

  render() {
    let errorText = '';
    if (this.props.error) {
      errorText = 'This field is required.';
    }
    return (

        <div className="form-group ">
          <h5 className="category" style={{fontWeight: "bold"}} > Date of Birth (YYYY-MM-DD) </h5>
          <DatePicker
              selected={this.state.value}
              onChange={this.onChange}
              peekNextMonth
              showMonthDropdown
              showYearDropdown
              scrollableYearDropdown
              dropdownMode="select"
              dateFormat="yyyy-MM-dd"
              maxDate={(new Date())}
              className={this.props.error ? "field-error" : "form-control"}
          />
          {this.props.error ? <p> {this.props.error} </p> : null  }
        </div>

    );
  }
}

SubjectDOBField.propTypes = {
  dispatch: PropTypes.func,
  value: PropTypes.string,
  error: PropTypes.string,
  new: PropTypes.bool,
};

function mapStateToProps(state) {
  return {
    subject: state.subject.activeSubject,
    newSubject: state.subject.newSubject,
  };
}

export default connect(mapStateToProps)(SubjectDOBField);
