import React, {useContext, useEffect} from "react";
import SessionContext from "../contexts/SessionContext";


interface SessionConditionalElementProps {
    loggedIn: boolean,
    roles?: string[]
    element: React.ReactNode;
}

export const SessionConditionalElement = ({loggedIn, roles = [], element}: SessionConditionalElementProps) => {
    return <>{element}</>;
}

interface SessionSwitchProps {
    children?: React.ReactNode,
    devOverride?: { login: boolean, role: string } //TODO remove
}

const SessionSwitch = ({children, devOverride}: SessionSwitchProps) => {
    const {session} = useContext(SessionContext);

    const filterChildren = (children: React.ReactNode): React.ReactNode[] => {
        let filteredChildren: React.ReactElement[] = [];

        //TODO remove
        if (devOverride) {
            console.log("using dev overrides for SessionSwitch");
        }

        React.Children.map(children, e => {
            if (!React.isValidElement(e)) {
                return;
            }

            if (e.type.toString() !== SessionConditionalElement.toString()) {
                console.error(`[${
                    typeof e.type === "string" ? e.type : e.type.name
                }] is not a <SessionConditionalElement> component.\n
                All component children of <SessionSwitch> must be a <SessionConditionalElement>`);
                return;
            }

            const {loggedIn, roles = [""]} = e.props;
            //TODO remove
            if (devOverride) {
                const {login = false, role = ""} = devOverride;
                if (loggedIn === login && roles.indexOf(role) !== -1) {
                    filteredChildren.push(e);
                    return;
                }
            }

            if (loggedIn === session.loggedIn && roles.indexOf(session.role) !== -1) {
                filteredChildren.push(e);
                return;
            }
        });

        return filteredChildren;
    }


    return (
        <>
            {
                filterChildren(children)
            }
        </>
    );
};

export default SessionSwitch;