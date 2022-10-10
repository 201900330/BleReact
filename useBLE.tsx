import {PermissionsAndroid, Platform} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

type PermissionCallback = (result: boolean) => void;

const bleManager = new BleManager();

interface BluetoothLowEnergyApi{
    requestPermissions(callback: PermissionCallback): Promise<void>;
    //scanForDevices(): void;
}

export default function useBLE(): BluetoothLowEnergyApi{
   //const [allDevices, setAllDevices] = useState<Device[]>([]);

    const requestPermissions = async (callback: PermissionCallback) => {
        if(Platform.OS === "android"){
            const grantedStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, 
                {
                title: 'Location permission',
                message: 'Bluetooth low energy needs location permissions', 
                buttonNegative: 'Don\'t allow', 
                buttonPositive: 'Allow', 
                buttonNeutral: 'Maybe Later',
            },
        );
        callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
        } else{
            callback(false);
        }
    };
    
    // const isDuplicate = (devices: Device[], nextDevice: Device) =>
    //     devices.findIndex(device => nextDevice.id == device.id) > -1;


    // const scanForDevices = () =>{
    //     bleManager.startDeviceScan(null, null, (error, device) =>{
    //         if(error) console.log(error);
    //         if(device){
    //             setAllDevices((prevState) => {
    //                 if(!isDuplicate(prevState, device)){
    //                     return [...prevState, device]
    //                 }
    //                 return prevState;
    //             })
    //         }

    //     } ) 
    // }
    return {
        requestPermissions,
    };
}

