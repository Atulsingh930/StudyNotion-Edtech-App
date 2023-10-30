import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import interling from '../../../../assets/Images/interling.svg'
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdDelete } from 'react-icons/md';
import { HiMiniPencil } from 'react-icons/hi2';
import {RiAddLine} from 'react-icons/ri'
import ConfirmationModal from '../../../common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../services/operations/courseDetailsApi';
import { setCourses } from '../../../../slices/courseSlice';
import SubSectionModal from './SubSectionModal';

function NestedView({loading, handleEditSectionName}) {

    const {courses} = useSelector((state)=>state.course);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    
    const [addSubSection, setAddSubSection] = useState(null)
    const [viewSubSection, setViewSubSection] = useState(null)
    const [editSubSection, setEditSubSection] = useState(null)

    const section = courses.courseContent;

    const [confirmationModal, setConfirmationModal] = useState(null);

    async function handleDeleteSection(sectionID){
        const result = await deleteSection(
            {
                sectionID,
                courseID : courses._id
            },token
        )
        if(result){
            dispatch(setCourses(result))
        }
        setConfirmationModal(null)
    }


    async function handleDeleteSubSection(sectionID, subSectionID){
        const result = await deleteSubSection(
            {
                courseID : courses._id,
                sectionID,
                subSectionID
            }, token
        )
        if(result){
            dispatch(setCourses(result))
        }setConfirmationModal(null);
    }

  return (
    <div className='w-full bg-richblack-700 px-6 rounded-lg border border-richblack-500'>
        {
            !loading && section.map((sectionElem, index)=>(
                <details key={sectionElem._id} className='transition-all duration-1000 ease-in-out'>
                <summary className={`w-full flex justify-between items-center py-3  ${index<section?.length-1 && 'border-b border-richblack-600'}`}>
                    <div className='flex gap-2'>
                        <img src={interling} alt="" height={20} width={20} className='cursor-pointer'/>
                        <p className='text-richblack-50 font-semibold'>{sectionElem.sectionName}</p>
                    </div>
                    <div className='flex gap-3 ml-[15rem] text-xl text-richblack-400'>
                        <div className='flex gap-3'>
                            <HiMiniPencil className='cursor-pointer' onClick={()=>handleEditSectionName(sectionElem._id, sectionElem.sectionName)}/>
                            <MdDelete className='cursor-pointer' onClick={(e)=>{
                                e.preventDefault()
                                setConfirmationModal(
                                    {
                                        text1: "Delete this Section",
                                        text2: "All the lectures in this section wil be deleted",
                                        btn1Text: "Delete",
                                        btn2Text: "Cancel",
                                        btn1Handler: () => handleDeleteSection (sectionElem._id),
                                        btn2Handler: () => setConfirmationModal(null),
                                    }
                                )
                            }}/>
                        </div>
                        <div className='h-5 w-[0.0625rem] bg-richblack-600 '></div>
                        <div>
                            <IoMdArrowDropdown/>
                        </div>
                    </div>
                </summary>
                <div>
                    <div className='flex flex-col'>
                        {sectionElem?.subSection?.length>0 && 
                            sectionElem?.subSection.map((subSection)=>(
                                <div className='w-full pl-6 py-3 flex justify-between items-center border-b border-richblack-600'>
                                    <div className='flex gap-2 cursor-pointer' onClick={()=>setViewSubSection(subSection)}>
                                        <img src={interling} alt="" height={20} width={20} className='cursor-pointer'/>
                                        <p className='text-richblack-50 font-semibold'>{subSection.title}</p>
                                    </div>
                                    <div className='flex gap-3 text-xl text-richblack-400'>
                                        <HiMiniPencil className='cursor-pointer' onClick={()=>setEditSubSection({subSectionID : subSection._id, ...subSection})}/>
                                        <MdDelete className='cursor-pointer' onClick={(e)=>{
                                            e.preventDefault()
                                            setConfirmationModal(
                                                {
                                                    text1: "Delete this SubSection",
                                                    text2: "The lectures in this subsection wil be deleted",
                                                    btn1Text: "Delete",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: () => handleDeleteSubSection (sectionElem._id, subSection._id),
                                                    btn2Handler: () => setConfirmationModal(null),
                                                }
                                            )
                                        }}/>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                    <div onClick={()=>setAddSubSection(sectionElem._id)} className='w-full flex gap-1 items-center py-3 cursor-pointer'>
                        <RiAddLine className='text-yellow-50 text-2xl font-bold mb-0.5'/>
                        <p className='text-yellow-50 font-medium'>Add Lecture</p>
                    </div>
                </div>
                </details>
            ))
        }
        {confirmationModal!==null && <ConfirmationModal modalData={confirmationModal}/>}
        {viewSubSection?(<SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>):
        editSubSection?(<SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>):
        addSubSection&&(<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>)}
    </div>
  )
}

export default NestedView