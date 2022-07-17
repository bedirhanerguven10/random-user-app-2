import React, { useEffect, useState } from "react";
import mailSvg from "../assets/mail.svg";
import manSvg from "../assets/man.svg";
import womanSvg from "../assets/woman.svg";
import manAgeSvg from "../assets/growing-up-man.svg";
import womanAgeSvg from "../assets/growing-up-woman.svg";
import mapSvg from "../assets/map.svg";
import phoneSvg from "../assets/phone.svg";
import padlockSvg from "../assets/padlock.svg";
import toast from "react-hot-toast";
import { Toaster, ToastBar } from 'react-hot-toast'



const User = ({ user, getUser }) => {
  const [rows, setRows] = useState([]);
  const [value, setValue] = useState(user[0].name.first);
  const [variable, setVariable] = useState("name");
  const [emails, setEmails] = useState([]);

  const addRow = () => {
    if (emails.includes(user[0].email)) {
      toast("User already exists!!!");
    } else {
      setRows([
        ...rows,
        [
          { header: user[0].name.first },
          { header: user[0].email },
          { header: user[0].cell.split("-").join("") },
          { header: user[0].dob.age },
        ],
      ]);
      setEmails([...emails, user[0].email]);
    }
  };

  useEffect(() => {
    setVariable("name");
    setValue(user[0].name.first);
  }, [user]);

  return (
    <div className="block">
      <Toaster >
  {(t) => (
    <ToastBar
      toast={t}
      style={{
        ...t.style,
        animation: t.visible ? 'custom-enter 1s ease' : 'custom-exit 1s ease',
        border: '1px solid red',
        
      }}
    />
  )}
</Toaster>;
      <div className="container">
        {user?.map((e, i) => {
          return (
            <div key={i}>
              <img
                src={e.picture.large}
                alt="random user"
                className="user-img"
              />
              {value && (
                <>
                  <p className="user-title">My {variable} is</p>
                  <p className="user-value">{value}</p>
                </>
              )}
              <div className="values-list">
                <button className="icon" data-label="name">
                  <img
                    src={e.gender === "female" ? womanSvg : manSvg}
                    alt="user"
                    id="iconImg"
                    onMouseOver={() => {
                      setVariable("name");
                      setValue(user[0].name.first);
                    }}
                  />
                </button>
                <button className="icon" data-label="email">
                  <img
                    src={mailSvg}
                    alt="mail"
                    id="iconImg"
                    onMouseOver={() => {
                      setVariable("email");
                      setValue(user[0].email);
                    }}
                  />
                </button>
                <button className="icon" data-label="age">
                  <img
                    src={e.gender === "female" ? womanAgeSvg : manAgeSvg}
                    alt="age"
                    id="iconImg"
                    onMouseOver={() => {
                      setVariable("age");
                      setValue(user[0].dob.age);
                    }}
                  />
                </button>
                <button className="icon" data-label="street">
                  <img
                    src={mapSvg}
                    alt="map"
                    id="iconImg"
                    onMouseOver={() => {
                      setVariable("street");
                      setValue(user[0].location.street.name);
                    }}
                  />
                </button>
                <button className="icon" data-label="phone">
                  <img
                    src={phoneSvg}
                    alt="phone"
                    id="iconImg"
                    onMouseOver={() => {
                      setVariable("phone");
                      setValue(user[0].cell.split("-").join(""));
                    }}
                  />
                </button>
                <button className="icon" data-label="password">
                  <img
                    src={padlockSvg}
                    alt="lock"
                    id="iconImg"
                    onMouseOver={() => {
                      setVariable("password");
                      setValue(user[0].login.password);
                    }}
                  />
                </button>
              </div>
            </div>
          );
        })}

        <div className="btn-group">
          <button className="btn" type="button" onClick={() => getUser()}>
            new user
          </button>
          <button className="btn" type="button" onClick={addRow}>
            add user
          </button>
        </div>

        <table className="table">
          <thead>
            <tr className="head-tr">
              <th className="th">Firstname</th>
              <th className="th">Email</th>
              <th className="th">Phone</th>
              <th className="th">Age</th>
            </tr>
          </thead>
          <tbody>
            {rows?.map((e, i) => {
              return (
                <tr key={i} className="body-tr">
                  {e?.map((item, i) => {
                    return <td key={i}>{item.header}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
