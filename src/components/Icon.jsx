export default function Icon (props) {
    const {d, style, ...rest} = props;
    const _props = Object.assign({
        width: '100%',
        height: '100%',
        viewBox: '0 0 32 32',
        version: '1.1',
        xmlns: 'http://www.w3.org/2000/svg',
        style: Object.assign({
            fillRule: 'evenodd',
            clipRule: 'evenodd',
            strokeLinejoin: 'round',
            strokeMiterlimit: '1.41421'
        }, style)
    }, rest);
    return <svg {..._props}><path d={d} /></svg>;
}


