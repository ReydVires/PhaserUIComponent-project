declare namespace PhaserUIComponent {
    
    namespace Button {

        type Config = {
            /**
             * Button type that will generate based on ButtonComponent.
             * Common type are available:
             * * `Flat` (default)
             * * `Hold`
             * * `Radio`
             * * `Button`
             */
            type?: string;
            /**
             * Keys texture belonged to spritesheet 2 frame.
             */
            spritesheetTexture?: string;
            /**
             * Key texture that stored for rendering the button.
             */
            texture?: string;
            /**
             * Button text value in button.
             */
            label?: string;
            /**
             * Style value to custom the label.
             */
            style?: Phaser.Types.GameObjects.Text.TextStyle;
            /**
             * Function that will be called after.
             */
            callback?: Function;
            /**
             * Parameter or argument that passed to button.
             */
            arg?: any;
            /**
             * The callback will be triggered again after on up button.
             */
            callbackOnUp?: boolean;
            /**
             * Used for on toggle texture.
             */
            onToggleTexture?: string;
            /**
             * Only work for `Radio` type button, default value.
             */
            isToggleActive?: boolean;
        };

    }

    namespace Virtual {
        
        namespace Control {

            type ObjectConfig = {
                /**
                 * VirtualJoystick type that will generate based on VirtualJoystickComponent.
                 * Common type are available:
                 * * `Joystick` (default)
                 * * `Arrow` or `DPAD`
                */
                type?: string;
                /**
                 * Single key texture that stored 2 frame (`controller` & `base`)
                 * for rendering the VirtualJoystick.
                 */
                spritesheetTexture?: string;
                /**
                 * Key texture that stored for rendering the Joystick controller.
                 */
                texture?: string;
                /**
                 * Key texture that stored for rendering the Joystick `base`.
                 */
                container?: string;
                /**
                 * Object to be simulated to control.
                 */
                controlled?: object;
                /**
                 * Take body for movement instead of normal position.
                 */
                isPhysics?: boolean;
                /**
                 * Only work for `DPAD` or `Arrow` type of controller.
                 * Set width space betweens button.
                 */
                width?: number;
                /**
                 * Only work for `DPAD` or `Arrow` type of controller.
                 * Set height space betweens button.
                 */
                height?: number;
                /**
                 * Costumize the callback function of button.
                 * There is `arrowKey` for catch the pressed button and `controlled` for controlled.
                 */
                callback?: Function;
                /**
                 * Any given argument or parameter for `callback`.
                 */
                argument?: any;
                /**
                 * Set whether use `down`, `left`, `up`, or `right` button control.
                 */
                arrowConfig?: ArrowConfig;
            }

            type ArrowConfig = {
                /**
                 * Set down arrow button available.
                 */
                down?: boolean;
                /**
                 * Set left arrow button available.
                 */
                left?: boolean;
                /**
                 * Set up arrow button available.
                 */
                up?: boolean;
                /**
                 * Set right arrow button available.
                 */
                right?: boolean;
            }

        }

    }

    namespace TextField {

        type Config = {
            /**
             * An id for textfield component.
             */
            id: string;
            /**
             * Custom specified textfield element for placing texture with stored `key`.
             */
            texture?: string;
            /**
             * Place holder for input.
             */
            placeholder?: string;
            /**
             * Set attribute the size of input character.
             */
            inputWidth?: string;
            /**
             * TextField type that will generate based on TextFieldComponent.
             * * `Flat` (default)
             */
            type?: string;
        }

        type Style = {
            /**
             * Set TextField height manually in px.
             */
            height?: number;
            /**
             * Set TextField padding from input in px.
             */
            padding?: number;
            /**
             * Set TextField background color.
             */
            bgColor?: string;
            /**
             * Set size of input in TextField.
             */
            fontSize?: number;
            /**
             * Set align text in input of TextField.
             */
            textAlign?: string;
            /**
             * Set text color.
             */
            textColor?: string;
        }

    }

}