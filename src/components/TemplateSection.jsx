import React from 'react'
import { useNavigate } from 'react-router-dom';
import { createWeddingWebsite, updateWeddingWebsite } from "../Store/slices/weddingtemplateSlice";
import { useDispatch ,useSelector} from 'react-redux';
const TemplateCard = ({ template, id }) => {
  console.log(template);
  console.log(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('user');
  const handleTemplateClick = async (id) => {
    if (!user.isWebsiteCreated) {
      console.log("Website created");
      const res = await dispatch(createWeddingWebsite(id));
      console.log(res);
      if (res.type === 'weddingtemplates/createWeddingWebsite/rejected') {
        navigate('/login');
      }
      else if (res.type === 'weddingtemplates/createWeddingWebsite/fulfilled') {
        console.log(res.payload);
        navigate(`/us/${res?.payload?.slug}`);
      }
    } else {
      console.log("Website not created");
      const res = await dispatch(updateWeddingWebsite(id));
      if (res.type === 'weddingtemplates/updateWeddingWebsite/rejected') {
        navigate('/login');
      }
      else if (res.type === 'weddingtemplates/updateWeddingWebsite/fulfilled') {
        navigate(`/us/${res?.payload?.slug}`);
      }
    }
  }
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer" onClick={() => handleTemplateClick(id)}>
      <div className="p-4">
        <div
          className="bg-gray-50 p-4 rounded-md"
          dangerouslySetInnerHTML={{ __html: template }}
        />
      </div>
    </div>
  );
};
const TemplateSection = ({weddingTemplates}) => {
  console.log(weddingTemplates);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {weddingTemplates?.map((template) => (
          <TemplateCard key={template.id} id={template.id} template={template.content} />
        ))}
      </div>
  )
}

export default TemplateSection