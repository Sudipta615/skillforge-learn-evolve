import { GraduationCap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="container py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-foreground">SkillForge</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 SkillForge. Empowering learners worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
