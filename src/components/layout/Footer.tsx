import { Link } from 'react-router-dom';
import { Github, Mail, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-semibold text-lg">DRDO Expert Match</h3>
            <p className="text-sm text-muted-foreground">
              Recruitment and Assessment Centre (RAC) under DRDO, Ministry of Defence
            </p>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/experts" className="hover:text-foreground">Expert Management</Link>
              </li>
              <li>
                <Link to="/candidates" className="hover:text-foreground">Candidate Management</Link>
              </li>
              <li>
                <Link to="/boards" className="hover:text-foreground">Board Management</Link>
              </li>
              <li>
                <Link to="/matching" className="hover:text-foreground">Matching System</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">Help Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">Terms of Service</a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>support@drdo.gov.in</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+91 (11) 2300-7090</span>
              </li>
              <li className="flex items-center space-x-2">
                <Github className="h-4 w-4" />
                <a href="#" className="hover:text-foreground">GitHub Repository</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DRDO Expert Matching System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}