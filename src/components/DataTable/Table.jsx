import React from 'react';
import Pagination from '../Pagination/Pagination';
const moment = require('moment');
import { Avatar } from '@nextui-org/react';

export default function Table ({keyImg,customColumnName, customColumnName2, customStateColumn, columns, data, customActionColumn, totalPages, currentPage, onPageChange }){
  if (!data || !Array.isArray(data)) {
    return null;
  }

  const totalPrice = (objects)=>{
    try{
      let totalPrice = 0;
      for(let key in objects){
        if(objects[key]){
          totalPrice += objects[key].price *objects[key].quantity  

        }
      }
      return totalPrice;
    }catch(Err){
      console.log({Err});
      
    }
  }
  return (
    <div>
      <table className="w-full border-collapse font-arial">
      <thead className='bg-slate-100'>
        <tr>
          {columns.map((column) => (
            <th key={column.key} className={`border ${column.text} p-2`}>
              {column.label}
            </th>
          ))}
          {customStateColumn && <th className="border text-center p-3">{customColumnName2}</th>}
          {customActionColumn && <th className="border text-center p-3">{customColumnName}</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? 
        (data.map((item, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column.key} className={`border ${column.text} p-2`}>
                  {column.key === keyImg && item[column.key] != '' && keyImg !== "avatarURL" ?             
                      (<img src={item[column.key]} alt="Hình ảnh"  className="mx-auto" width={60} height={60} />) : <></>
                  }
                  {column.key === keyImg && item[column.key] != '' && keyImg === "avatarURL" ?             
                      (<div className='flex justify-center'><Avatar src={item[column.key]} size="lg" isBordered /></div>) : <></>
                  }
                  {
                    (column.key === "price" || column.key === "Price") &&
                    <>{totalPrice(item.product)?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</>
                  }
                  {
                    column.key != "price" && column.key != "Price" && column.key != keyImg &&
                    <>{item[column.key]}</>
                  }
              </td>
            ))}
            {customStateColumn && (
              <td className="border text-left p-4">
                {customStateColumn.render(item, index)}
              </td>
            )}
            {customActionColumn && (
              <td className="border text-left p-4">
                {customActionColumn.render(item)}
              </td>
            )}
          </tr>
        ))
        ): (            
          <tr >
            <td colSpan="6" className='border text-center p-4'>Không có thông tin</td>
          </tr>
        )}

      </tbody>
    </table>
      <div className='py-2 px-5'>
      <Pagination totalPages={totalPages} currentPage={currentPage} onPageChange={onPageChange} />
      </div>
    </div>
  );
};


