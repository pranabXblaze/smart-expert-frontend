import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DRDOExpertConnect() {
  const [domain, setDomain] = useState("");
  const [location, setLocation] = useState("");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectLinkedIn = () => {
    window.open('https://www.linkedin.com/oauth/v2/authorization', '_blank');
  };

  const searchExperts = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/db', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer QmR1htAboLM0vUIeuMLbwIqPS613',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'system',
          appSlug: 'drdo-expert-connect',
          action: 'read',
          table: 'experts',
          data: { domain, location }
        })
      });
      const result = await response.json();
      setExperts(result.data || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const initiateConnect = async (expertId:String) => {
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/db', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer QmR1htAboLM0vUIeuMLbwIqPS613',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: 'system',
          appSlug: 'drdo-expert-connect',
          action: 'create',
          table: 'connections',
          data: {
            expert_id: expertId,
            status: 'pending',
            timestamp: new Date().toISOString()
          }
        })
      });
      const result = await response.json();
      if (!result.error) {
        alert('Connection request sent successfully!');
      }
    } catch (error) {
      alert('Failed to send connection request.');
    }
  };

  useEffect(() => {
    searchExperts();
  }, []);

  return (
    <div className="min-h-screen">
      <nav className="relative w-full z-50 px-6 py-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="relative md:flex space-x-6">
            <a href="#" className="text-green-900 hover:text-green-600">Dashboard</a>
            <a href="#" className="text-green-900 hover:text-green-600">Find Experts</a>
            <a href="#" className="text-green-900 hover:text-green-600">Domains</a>
            <a href="#" className="text-green-900 hover:text-green-600">About</a>
          </div>
          <Button onClick={connectLinkedIn} className="bg-green-600 hover:bg-green-700">
            Connect LinkedIn
          </Button>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-900 mb-6">
            Connect with DRDO
            <span className="block text-green-600">Interviews</span>
          </h1>
          <p className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
            Find and connect with India's leading defense technology experts for consultations and collaborations.
          </p>

          <div className="max-w-4xl mx-auto glass-effect rounded-xl p-6 mb-12">
            <div className="flex flex-col md:flex-row gap-4">
              <Select onValueChange={setDomain}>
                <SelectTrigger>
                  <SelectValue placeholder="Select DRDO Domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="aeronautics">Aeronautics</SelectItem>
                  <SelectItem value="armaments">Armaments & Combat Engineering</SelectItem>
                  <SelectItem value="electronics">Electronics & Communication Systems</SelectItem>
                  <SelectItem value="life_sciences">Life Sciences</SelectItem>
                  <SelectItem value="materials">Materials & Advanced Technologies</SelectItem>
                  <SelectItem value="missiles">Missiles & Strategic Systems</SelectItem>
                  <SelectItem value="naval">Naval Systems & Materials</SelectItem>
                  <SelectItem value="cyber">Cyber Systems & Information Security</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi-NCR</SelectItem>
                  <SelectItem value="bangalore">Bangalore</SelectItem>
                  <SelectItem value="hyderabad">Hyderabad</SelectItem>
                  <SelectItem value="pune">Pune</SelectItem>
                  <SelectItem value="all">All India</SelectItem>
                </SelectContent>
              </Select>

              <Button onClick={searchExperts} className="bg-green-600 hover:bg-green-700">
                Find Experts
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 pb-20">
        {loading ? (
          <div className="text-center py-12">
            <Loader className="h-8 w-8 animate-spin mx-auto" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {experts.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-xl">No experts found matching your criteria.</p>
              </div>
            ) : (
              experts.map(expert => (
                <Card key={expert.id} className="glass-effect p-6 domain-card">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-green-900">{expert.data.name}</h3>
                      <p className="text-gray-600">{expert.data.title}</p>
                      <p className="text-sm text-gray-500">{expert.data.location}</p>
                    </div>
                    <div className="flex items-center">
                      <span className={`${expert.data.available ? 'bg-green-500' : 'bg-red-500'} h-3 w-3 rounded-full pulse`}></span>
                      <span className={`ml-2 text-sm ${expert.data.available ? 'text-green-500' : 'text-red-500'}`}>
                        {expert.data.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {expert.data.specializations.map((spec, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-100 text-green-800">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <Button onClick={() => initiateConnect(expert.id)} className="bg-green-600 hover:bg-green-700">
                      Request Connect
                    </Button>
                    <div className="flex space-x-2">
                      <a href={expert.data.linkedin} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:text-green-800">
                        <i className="bi bi-linkedin text-xl"></i>
                      </a>
                      <a href={`mailto:${expert.data.email}`} className="text-green-600 hover:text-green-800">
                        <i className="bi bi-envelope text-xl"></i>
                      </a>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}