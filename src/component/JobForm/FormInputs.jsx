import  { memo,forwardRef } from 'react';


// eslint-disable-next-line react/display-name
const FormInputs = forwardRef(({ name, labelName, type, placeholder ,...rest}, ref) => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div>
        <label htmlFor={name}>{labelName}</label>
        <div>
          <input
            type={type}
            placeholder={placeholder}
            name={name}
            ref={ref}
            {...rest}
            style={{
              width:
                type === "text"
                  ? "250px"
                  : type === "email"
                  ? "250px"
                  : type === "number"
                  ? "250px"
                  : "",
              height:
                type === "text"
                  ? "30px"
                  : type === "email"
                  ? "30px"
                  : type === "number"
                  ? "30px"
                  : "",
            }}
          />
        </div>
      </div>
    </div>
  );
});

export default memo(FormInputs);

























// function FormInputs({ name, labelName, type, placeholder, ...rest }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "center" }}>
//       <div>
//         <label htmlFor={name}>{labelName}</label>
//         <div>
//           <input
//             type={type}
//             placeholder={placeholder}
//             name={name}
//             {...rest} 
//             style={{
//               width:
//                 type === "text" || type === "email" || type === "number"
//                   ? "250px"
//                   : "",
//               height:
//                 type === "text" || type === "email" || type === "number"
//                   ? "30px"
//                   : "",
//             }}
//           />
//         </div>
//       </div>
      
//     </div>
//   );
// }

// export default FormInputs;
