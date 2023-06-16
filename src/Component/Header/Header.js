import React, { useEffect, useRef, useState } from "react";
import logo from "../../asset/img/logo.svg";
import { IoGlobeOutline } from "react-icons/io5";
import { HiUserCircle, HiMenu } from "react-icons/hi";
import { FaSearch } from "react-icons/fa";
import styles from "./Header.module.scss";
import { useClickAway } from "@uidotdev/usehooks";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { CiCalendar } from "react-icons/ci";
import { IoIosArrowDown } from "react-icons/io";
import { localSearch } from "../../Services/RoomServices";
import moment from "moment/moment";

export default function Header() {
  const [show, setShow] = useState(false);
  const [showSelectLocal, setShowSelectLocal] = useState(false);
  const [showCalenderedBooking, setShowCalenderedBooking] = useState(false);
  const [showCalenderedCheckOut, setShowCalenderedCheckOut] = useState(false);
  const [listLocal, setListLocal] = useState([]);
  const [valueLocal, setValueLocal] = useState("");
  const [dateBooking, setDateBooking] = useState("");
  const [dateCheckout, setDateCheckout] = useState("");
  const ref = useClickAway(() => {
    setShow(false);
  });
  const refSelect = useClickAway(() => {
    setShowSelectLocal(false);
  });
  const refBooking = useClickAway(() => {
    setShowCalenderedBooking(false);
  });
  const refCheckOut = useClickAway(() => {
    setShowCalenderedCheckOut(false);
  });
  const handleSwapShow = () => {
    if (show === false) {
      setShow(true);
    }
  };
  const handleSwapShowSelectLocal = () => {
    if (showSelectLocal === false) {
      setShowSelectLocal(true);
    }
  };
  const handleShowBooking = () => {
    if (showCalenderedBooking === false) {
      setShowCalenderedBooking(true);
    }
  };
  const handleShowCheckOut = () => {
    if (showCalenderedCheckOut === false) {
      setShowCalenderedCheckOut(true);
    }
  };
  // calender
  const handleChangeCalendarBooking = (value) => {
    setDateBooking(moment(value).format("L"));
  };
  const handleChangeCalendarCheckOut = (value) => {
    setDateCheckout(moment(value).format("L"));
  };
  useEffect(() => {
    localSearch().then((res) => {
      setListLocal(res.data.content);
    });
  }, []);

  const handleRenderSelectLocalSearch = () => {
    return listLocal.map((item, index) => {
      return (
        <h3
          className="px-4 py-2 cursor-pointer"
          key={index}
          onClick={() => {
            handleSelectValue(item.tenViTri);
          }}
        >
          {item.tenViTri}
        </h3>
      );
    });
  };
  const handleSelectValue = (local) => {
    setValueLocal(local);
  };
  return (
    <div className="px-6 md:px-10 lg:px-20  ">
      <div className="flex items-center justify-between h-20 text-sm">
        <div>
          <img src={logo} alt="logo" />
        </div>
        {/* <div className="flex items-center h-12 shadow-2xl border rounded-3xl">
          <div className="px-4 border-solid border-r font-bold">
            <h2>Địa điểm bất kỳ</h2>
          </div>
          <div className="px-4 border-solid border-r font-bold">
            <h2>Tuần bất kỳ</h2>
          </div>
          <div className="flex items-center px-4">
            <input
              className="outline-none"
              type="text"
              placeholder="Thêm khách"
            />
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center ${styles["header__color-search"]} hover:opacity-80 cursor-pointer`}
            >
              <FaSearch className="text-white" />
            </div>
          </div>
        </div> */}

        <div className={`${styles["header__date-book"]} grow`}>
          <ul className="flex items-center justify-center px-6">
            <li className="px-3 text-base py-3  ">
              <a className="block" href="#">
                Chỗ ở
              </a>
            </li>
            <li className="px-3 text-base py-3 ">
              <a className="block" href="#">
                Trải Nghiệm
              </a>
            </li>
            <li className="px-3 text-base py-3 focus:border-b-2 ">
              <a className="block" href="#">
                Trải nghiệm trực tuyến
              </a>
            </li>
          </ul>
          <div
            className={`flex items-center ${styles["header__date-book-content"]} w-[850px] shadow-2xl px-5 py-3 rounded-3xl`}
          >
            <div className=" flex items-center border-r-2 ">
              <h3 className=" font-bold">Địa điểm</h3>
              <div
                onClick={handleSwapShowSelectLocal}
                className={`flex items-center ${styles["header__input-select"]}`}
              >
                <input
                  onClick={() => {
                    setShowSelectLocal(false);
                  }}
                  className="py-[2px] outline-none border-r-2 ml-2"
                  type="text"
                  value={valueLocal}
                />
                <IoIosArrowDown className="cursor-pointer text-lg m-2" />
                {showSelectLocal && (
                  <div
                    ref={refSelect}
                    className={`${styles["header__select-value"]} overflow-y-scroll h-56 shadow-2xl border-b-2 `}
                  >
                    {handleRenderSelectLocalSearch()}
                  </div>
                )}
              </div>
            </div>
            <div
              onClick={handleShowBooking}
              className={`flex items-center justify-between px-6 border-r-2 ${styles["header__calendar"]} `}
            >
              <div>
                <h3 className="font-bold">Nhận phòng</h3>
                <p>{dateBooking === "" ? "mm/dd/yyyy" : dateBooking}</p>
              </div>
              <CiCalendar className="cursor-pointer ml-3" />
              {showCalenderedBooking && (
                <div
                  ref={refBooking}
                  className={`${styles["header__calendar-item"]}`}
                >
                  <Calendar
                    onChange={handleChangeCalendarBooking}
                    value={dateBooking}
                  />
                </div>
              )}
            </div>
            <div
              onClick={handleShowCheckOut}
              className={`flex items-center justify-between px-6  border-r-2 ${styles["header__calendar"]}`}
            >
              <div>
                <h3 className="font-bold">Trả phòng</h3>
                <p>{dateCheckout === "" ? "mm/dd/yyyy" : dateCheckout}</p>
              </div>
              <CiCalendar className="cursor-pointer ml-3" />
              {showCalenderedCheckOut && (
                <div
                  ref={refCheckOut}
                  className={`${styles["header__calendar-item"]}`}
                >
                  <Calendar
                    onChange={handleChangeCalendarCheckOut}
                    value={dateCheckout}
                  />
                </div>
              )}
            </div>
            <div className="flex items-center justify-between  pl-6">
              <div>
                <h3 className="font-bold">Khách</h3>
                <input
                  type="text "
                  className="outline-none"
                  placeholder="Thêm khách"
                />
              </div>
              <div
                className={`w-12 h-12 rounded-full ${styles["header__color-search"]} flex items-center justify-center cursor-pointer hover:opacity-75`}
              >
                <FaSearch className="text-white" />
              </div>
              <div></div>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <h3
            className={`font-bold w-52 h-14 flex items-center justify-center cursor-pointer ${styles["text__hover-bg"]}`}
          >
            Cho thuê chỗ ở qua Airbnb
          </h3>
          <div
            className={`flex items-center justify-center w-14 h-14 rounded-full ${styles["header__globe-map"]}`}
          >
            <IoGlobeOutline
              className={`text-2xl  ${styles["header__color-icon"]}`}
            />
          </div>
          <div
            onClick={handleSwapShow}
            className={`flex items-center border-solid border px-3 py-2 rounded-xl hover:cursor-pointer hover:shadow-2xl ${styles["header__account"]}`}
          >
            <HiMenu className={`text-2xl  ${styles["header__color-icon"]} `} />
            <HiUserCircle
              className={`text-2xl ml-3  ${styles["header__color-icon"]}`}
            />
            {show && (
              <div
                ref={ref}
                className={`${styles["header__modal-account"]} text-right border-2 rounded-lg px-5 py-2`}
              >
                <h3 className="py-2">Đăng ký</h3>
                <h3 className="py-2">Đăng nhập</h3>
                <div className="border-t-2">
                  <h3 className="py-2">Cho thuê nhà ở qua AirBnb</h3>
                  <h3 className="py-2">Tổ chức trải nghiệm</h3>
                  <h3 className="">Trợ giúp</h3>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
