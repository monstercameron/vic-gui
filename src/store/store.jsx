import React, { useState, useEffect } from 'react';
export const Context = React.createContext(null);

export const injectContext = (PassedComponent) => {
    const StoreWrapper = (props) => {
        //this will be passed as the contenxt value
        const [state, setState] = useState(
            getState({
                getStore: () => state.store,
                getActions: () => state.actions,
                setStore: (updatedStore) =>
                    setState({
                        store: Object.assign(state.store, updatedStore),
                        actions: { ...state.actions }
                    })
            })
        );

        useEffect(() => {
            /**
             * EDIT THIS!
             * This function is the equivalent to "window.onLoad", it only runs once on the entire application lifetime
             * you should do your ajax requests or fetch api requests here. Do not use setState() to save data in the
             * store, instead use actions, like this:
             *
             * state.actions.loadSomeData(); <---- calling this function from the flux.js actions
             *
             **/
        }, []);

        // The initial value for the context is not null anymore, but the current state of this component,
        // the context will now have a getStore, getActions and setStore functions available, because they were declared
        // on the state of this component
        return (
            <Context.Provider value={state}>
                <PassedComponent {...props} />
            </Context.Provider>
        );
    };
    return StoreWrapper;
};

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            fuelLevel: 50,
            rpm: 1248,
            vss: 45,
            lastMileage: 146021,
            currentMileage: 146031,
            MAXRANGE: 250,
            temp: 0
        },
        actions: {
            setFuelLevel: (fuel) => setStore({ fuelLevel: fuel }),
            setRPM: (rpm) => setStore({ rpm: rpm }),
            setVSS: (vss) => setStore({ vss: vss }),
            setTemp: (temp) => setStore({ temp: temp }),
            currentTripMileage: () => getStore().currentMileage - getStore().lastMileage
        }
    };
};

export default getState;