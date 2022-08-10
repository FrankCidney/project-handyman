// const error = () => {
//     const errorMsg = "Unable to retrieve your location";
// }

const options = {
    enableHighAccuracy: true
}
const doNothing = path => {console.log(`Navigate to ${path}`)};

// get current user location function
export const getLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
            resolve(position);
            },
            (error) => reject(error.message), options);
    });
}

// fetch function
const API = process.env.REACT_APP_SERVER_URL;
export const handleFetch = async (endpoint, options, navigate = doNothing) => {
    const redirecting = 'redirecting';
    const {method, body} = {method: 'POST', body: null, ...options}

    const res = await fetch(`${API}/${endpoint}`, {
        method,
        ...(body && {body: JSON.stringify(body)}),
        credentials: 'include',
        headers: {'Content-Type': 'application/json'}
    });
    const data = await res.json();
    if (data.route) {
        if (data.route === '/') {
            navigate(data.route);
            return redirecting;
        }
    } else {
        return data;
    }
    // try {  
    // } catch (error) {
    //     console.log(error);
    // }
}

/* user input validation */
// regex patterns to validate against
export const regexPatterns = {
    username: /^\w+$/,
    phoneNo: /^\d{10}$/,
    email: /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/i,
    password: /^[^\s]{7,}$/
}
// validation function
export const validateInput = (regexKey, value, setInvalid, setErrors, errors, invalid) => {
    if (regexPatterns[regexKey]?.test(value)) {
        if (regexKey === 'username') {
            setErrors({...errors, username: ''});
        } else if (regexKey === 'email') {
            setErrors({...errors, email: ''});
        } else if (regexKey === 'phoneNo') {
            setErrors({...errors, phoneNo: ''});
        } else if (regexKey === 'password') {
            setErrors({...errors, password: ''});
        }
        setInvalid({...invalid, [regexKey]: ''});
        // setInvalidInput('');
    } else {
        if (regexKey === 'username') {
            setErrors({...errors, username: 'Username can only contain letters, numbers or _'});
        } else if (regexKey === 'email') {
            setErrors({...errors, email: 'Enter a valid email e.g., username@domain.com'});
        } else if (regexKey === 'phoneNo') {
            setErrors({...errors, phoneNo: 'Phone number must be 10 digits long'});
        } else if (regexKey === 'password') {
            setErrors({...errors, password: 'Minimum password length is 7 characters, without spaces'});
        }
        setInvalid({...invalid, [regexKey]: `invalid-${regexKey}`});
        // setInvalidInput('invalid');
    }
}

export function randomColor() {
    let hex = Math.floor(Math.random() * 0xFFFFFF);
    let color = "#" + hex.toString(16);

    return color;
}