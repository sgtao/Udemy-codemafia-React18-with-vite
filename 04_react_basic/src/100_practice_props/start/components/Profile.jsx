import "./Profile.css";
/* 初期コード：
const Profile = (props) => {
  return (
    <div className="profile">

    </div>
  );
};
*/
const Profile = ({
  name = 'Hide',
  age = 99,
  country = 'Japan',
}) => {
  return (
    <div className="profile">
      <h3>Name: {name}</h3>
      <h3>Age: {age}</h3>
      <h3>Country: {country}</h3>
    </div>
  );
}

export default Profile;
