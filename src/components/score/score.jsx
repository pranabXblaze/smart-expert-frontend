import React from "react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function InterviewMatcher() {
  const [experts, setExperts] = useState([]);
  const [userId] = useState(() => 
    localStorage.getItem('userId') || `user_${Date.now()}`
  );
  const [matchingResults, setMatchingResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', userId);
    }
    loadExperts();
  }, [userId]);

  const calculateMatchingScore = (expert, boardDomain, candidateKeywords) => {
    let score = 0;
    if (expert.domain === boardDomain) {
      score += 50;
    }
    const expertKeywords = expert.keywords.toLowerCase().split(',').map(k => k.trim());
    const candidateKeywordsList = candidateKeywords.toLowerCase().split(',').map(k => k.trim());
    const matchingKeywords = expertKeywords.filter(k => 
      candidateKeywordsList.some(ck => ck.includes(k) || k.includes(ck))
    );
    score += (matchingKeywords.length / Math.max(expertKeywords.length, candidateKeywordsList.length)) * 50;
    return Math.round(score);
  };

  const loadExperts = async () => {
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/db', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer JMVqjYdlRZQAOFhU1OsGudGlRG32',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          appSlug: 'drdo-interview-matcher',
          action: 'read',
          table: 'experts'
        })
      });
      if (response.ok) {
        const data = await response.json();
        setExperts(data.data.map(item => item.data));
      }
    } catch (error) {
      console.error('Error loading experts:', error);
    }
  };

  const handleExpertSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const expert = {
      name: formData.get('expertName'),
      domain: formData.get('expertDomain'),
      keywords: formData.get('expertKeywords')
    };

    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/db', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer JMVqjYdlRZQAOFhU1OsGudGlRG32',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId,
          appSlug: 'drdo-interview-matcher',
          action: 'create',
          table: 'experts',
          data: expert
        })
      });

      if (response.ok) {
        setExperts([...experts, expert]);
        alert('Expert profile added successfully!');
        e.target.reset();
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to add expert profile');
    }
  };

  const handleBoardSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const boardDomain = formData.get('boardDomain');
    const candidateKeywords = formData.get('candidateKeywords');

    const results = experts.map(expert => ({
      ...expert,
      score: calculateMatchingScore(expert, boardDomain, candidateKeywords)
    })).sort((a, b) => b.score - a.score);

    setMatchingResults(results);
    setShowResults(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/DRDO_Logo.svg/200px-DRDO_Logo.svg.png"
              alt="DRDO Logo"
              className="h-12"
            />
            <h1 className="ml-4 text-xl font-semibold text-gray-900">
              Interview Board Matching System
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Add Expert Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleExpertSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expertName">Name</Label>
                  <Input id="expertName" name="expertName" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expertDomain">Domain Expertise</Label>
                  <Select name="expertDomain" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Domain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="computer_science">Computer Science</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                      <SelectItem value="aerospace">Aerospace Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertKeywords">Keywords (comma separated)</Label>
                <Input
                  id="expertKeywords"
                  name="expertKeywords"
                  placeholder="AI, Machine Learning, Neural Networks"
                />
              </div>
              <Button type="submit">Add Expert</Button>
            </form>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Interview Board Requirements</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleBoardSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="boardDomain">Required Domain</Label>
                <Select name="boardDomain" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="computer_science">Computer Science</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="mechanical">Mechanical Engineering</SelectItem>
                    <SelectItem value="aerospace">Aerospace Engineering</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="candidateKeywords">Candidate Profile Keywords</Label>
                <Input
                  id="candidateKeywords"
                  name="candidateKeywords"
                  placeholder="Deep Learning, Computer Vision"
                />
              </div>
              <Button type="submit" variant="secondary">
                Find Matching Experts
              </Button>
            </form>
          </CardContent>
        </Card>

        {showResults && (
          <Card>
            <CardHeader>
              <CardTitle>Matching Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {matchingResults.map((result, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">{result.name}</h3>
                        <p className="text-sm text-gray-600">
                          Domain: {result.domain.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-sm text-gray-600">
                          Keywords: {result.keywords}
                        </p>
                      </div>
                      <div className="text-right">
                        <div
                          className={`text-2xl font-bold ${
                            result.score >= 70
                              ? 'text-green-600'
                              : result.score >= 40
                              ? 'text-yellow-600'
                              : 'text-red-600'
                          }`}
                        >
                          {result.score}%
                        </div>
                        <div className="text-sm text-gray-500">Match Score</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}