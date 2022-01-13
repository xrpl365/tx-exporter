import React, { useState, useRef, useEffect } from "react";
import { FormattedMessage } from "react-intl";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/pro-light-svg-icons";

import { Modal } from "../../../node_modules/bootstrap/dist/js/bootstrap.esm.min.js";

function DateTime(props) {
  const [datetimeModal, setDatetimeModal] = useState([]);
  const datetimeModalRef = useRef();
  const inputRef = useRef();

  const [inputDate, setInputDate] = useState();
  const [year, setYear] = useState();
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [hour, setHour] = useState();
  const [minute, setMinute] = useState();
  const [second, setSecond] = useState();
  const [validDate, setValidDate] = useState(true);

  useEffect(() => {
    const modal = new Modal(datetimeModalRef.current, {
      keyboard: false,
      backdrop: "static",
    });
    setDatetimeModal(modal);

    setInputDate(props.inputDate);

    if (inputDate && inputDate !== "") {
      const dateTimeParts = props.inputDate.split(" ");
      const dateParts = dateTimeParts[0].split("-");
      const timeParts = dateTimeParts[1].split(":");
      setYear(dateParts[0]);
      setMonth(dateParts[1]);
      setDay(dateParts[2]);
      setHour(timeParts[0]);
      setMinute(timeParts[1]);
      setSecond(timeParts[2]);
    }
  }, [inputDate, props.inputDate]);

  const showDatetimeModal = () => {
    datetimeModal.show();
  };

  const setDateTimeHandler = () => {
    if (year && month && day) {
      setValidDate(true);
      const d = `${year}-${month}-${day} ${hour ? hour : "00"}:${
        minute ? minute : "00"
      }:${second ? second : "00"}`;
      setInputDate(d);
      inputRef.current.value = d;
      props.update(d);
      datetimeModal.hide();
    } else {
      setValidDate(false);
    }
  };
  const yearChangeHandler = (e) => {
    setYear(e.target.value);
  };
  const monthChangeHandler = (e) => {
    setMonth(e.target.value);
  };
  const dayChangeHandler = (e) => {
    setDay(e.target.value);
  };
  const hourChangeHandler = (e) => {
    setHour(e.target.value);
  };
  const minuteChangeHandler = (e) => {
    setMinute(e.target.value);
  };
  const secondChangeHandler = (e) => {
    setSecond(e.target.value);
  };

  const clearDateTimeHandler = () => {
    inputRef.current.value = "";
    setYear("");
    setMonth("");
    setDay("");
    setHour("");
    setMinute("");
    setSecond("");
    setInputDate(null);
    props.update(null);
  };

  return (
    <>
      <div className="datetime-input">
        <div className="datetime-container">
          <div className="input-container">
            <input
              type="text"
              className="datetime"
              defaultValue={props.inputDate}
              ref={inputRef}
              readOnly="readonly"
            ></input>
          </div>
          <div className="input-clear" onClick={clearDateTimeHandler}>
            &times;
          </div>
        </div>
        <div className="icon" onClick={showDatetimeModal}>
          <FontAwesomeIcon icon={faCalendarAlt} className="calendar-icon" />
        </div>
      </div>

      <div className="modal" tabIndex="-1" ref={datetimeModalRef}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <FormattedMessage
                  id="app.filters.datetime.title"
                  defaultMessage="Invalid date"
                />
              </h5>
              <button type="button" data-bs-dismiss="modal" aria-label="Close">
                &times;
              </button>
            </div>
            <div className="modal-body" style={{ borderBottom: 0 }}>
              {!validDate && (
                <div className="validation-error">
                  <FormattedMessage
                    id="app.filters.datetime.error"
                    defaultMessage="Invalid date"
                  />
                </div>
              )}
              <div className="date-time-elements">
                <div className="date-elements">
                  <div className="element">
                    <label>Year</label>
                    <select onChange={yearChangeHandler} value={year}>
                      <option value=""></option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2016">2016</option>
                      <option value="2015">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                    </select>
                  </div>
                  <div className="element">
                    <label>Month</label>
                    <select onChange={monthChangeHandler} value={month}>
                      <option value=""></option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>
                  <div className="element">
                    <label>Day</label>
                    <select onChange={dayChangeHandler} value={day}>
                      <option value=""></option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                    </select>
                  </div>
                </div>
                <div className="time-elements">
                  <div className="element">
                    <label>Hour</label>
                    <select onChange={hourChangeHandler} value={hour}>
                      <option value=""></option>
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                    </select>
                  </div>
                  <div className="element">
                    <label>Minute</label>
                    <select onChange={minuteChangeHandler} value={minute}>
                      <option value=""></option>
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                    </select>
                  </div>
                  <div className="element">
                    <label>Second</label>
                    <select onChange={secondChangeHandler} value={second}>
                      <option value=""></option>
                      <option value="00">00</option>
                      <option value="01">01</option>
                      <option value="02">02</option>
                      <option value="03">03</option>
                      <option value="04">04</option>
                      <option value="05">05</option>
                      <option value="06">06</option>
                      <option value="07">07</option>
                      <option value="08">08</option>
                      <option value="09">09</option>
                      <option value="10">10</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                      <option value="13">13</option>
                      <option value="14">14</option>
                      <option value="15">15</option>
                      <option value="16">16</option>
                      <option value="17">17</option>
                      <option value="18">18</option>
                      <option value="19">19</option>
                      <option value="20">20</option>
                      <option value="21">21</option>
                      <option value="22">22</option>
                      <option value="23">23</option>
                      <option value="24">24</option>
                      <option value="25">25</option>
                      <option value="26">26</option>
                      <option value="27">27</option>
                      <option value="28">28</option>
                      <option value="29">29</option>
                      <option value="30">30</option>
                      <option value="31">31</option>
                      <option value="32">32</option>
                      <option value="33">33</option>
                      <option value="34">34</option>
                      <option value="35">35</option>
                      <option value="36">36</option>
                      <option value="37">37</option>
                      <option value="38">38</option>
                      <option value="39">39</option>
                      <option value="40">40</option>
                      <option value="41">41</option>
                      <option value="42">42</option>
                      <option value="43">43</option>
                      <option value="44">44</option>
                      <option value="45">45</option>
                      <option value="46">46</option>
                      <option value="47">47</option>
                      <option value="48">48</option>
                      <option value="49">49</option>
                      <option value="50">50</option>
                      <option value="51">51</option>
                      <option value="52">52</option>
                      <option value="53">53</option>
                      <option value="54">54</option>
                      <option value="55">55</option>
                      <option value="56">56</option>
                      <option value="57">57</option>
                      <option value="58">58</option>
                      <option value="59">59</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary btn-full"
                onClick={setDateTimeHandler}
              >
                <FormattedMessage
                  id="app.filters.datetime.button"
                  defaultMessage="Set date &amp; time"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DateTime;
