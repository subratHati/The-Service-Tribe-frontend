import axios from "../utils/axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";

export default function Services() {
    const {category} = useParams();
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetch = async() => {
            setLoading(true);
            try {
                const res = await axios.get(`/service/category/${category}`);
                setServices(res.data);

            } catch (error) {
                console.error(error);
            }finally{
                setLoading(false);
            }
        }
        fetch();
    }, [category]);

    return(
          <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
      </div>

      {loading && <div className="p-6">Loading services...</div>}

      {services.length > 0 && (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {services.map((s) => (
            <ServiceCard key={s._id} service={s} />
          ))}
        </div>
      )}
    </div>
    );
}