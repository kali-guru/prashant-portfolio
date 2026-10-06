"""Regenerate the factual student CV. Requires reportlab in the Python environment."""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
root = Path(__file__).resolve().parent.parent
styles = getSampleStyleSheet()
styles.add(ParagraphStyle(name='CVName',fontName='Helvetica-Bold',fontSize=25,leading=29,textColor=HexColor('#102d3b'),spaceAfter=7))
styles.add(ParagraphStyle(name='CVRole',fontName='Helvetica',fontSize=11,leading=15,textColor=HexColor('#295367'),spaceAfter=8))
styles.add(ParagraphStyle(name='CVBody',fontName='Helvetica',fontSize=9,leading=13,textColor=HexColor('#263744'),spaceAfter=7))
styles.add(ParagraphStyle(name='CVHeading',fontName='Helvetica-Bold',fontSize=10,leading=14,textColor=HexColor('#16546a'),spaceBefore=11,spaceAfter=6))
styles.add(ParagraphStyle(name='CVSmall',fontName='Helvetica',fontSize=8,leading=11,textColor=HexColor('#455966'),spaceAfter=5))
story=[]
def text(value,style='CVBody'):story.append(Paragraph(value,styles[style]))
text('PRASHANT GURUNG','CVName')
text('Ethical Hacking &amp; Cybersecurity Student | Kathmandu, Nepal','CVRole')
text('<a href="mailto:hello@prashantgrg.com.np">hello@prashantgrg.com.np</a> | +977 9768594758 | <a href="https://prashantgrg.com.np">prashantgrg.com.np</a>','CVSmall')
text('<a href="https://github.com/kali-guru">GitHub: kali-guru</a> | <a href="https://www.linkedin.com/in/prasan-gurung-769832367/">LinkedIn: Prashant Gurung</a> | <a href="https://tryhackme.com/p/stoicpg">TryHackMe: stoicpg</a>','CVSmall')
story.append(Spacer(1,8));story.append(HRFlowable(width='100%',thickness=1,color=HexColor('#aac5d1')))
text('PROFILE','CVHeading')
text('Cybersecurity student building foundations in web security, cybersecurity concepts and authorized penetration-testing methodology. Completed four TryHackMe learning paths and the Red Team Leaders CCEP exam. Seeking internship or entry-level opportunities in cybersecurity or IT support, with an emphasis on continuous learning, responsible testing and clear documentation.')
text('EDUCATION','CVHeading')
text('<b>BSc Ethical Hacking and Cybersecurity</b> | Currently studying<br/>Softwarica College of IT &amp; E-commerce, Kathmandu, Nepal')
text('LEARNING AREAS','CVHeading')
text('<b>Web and security foundations:</b> structured study through Web Fundamentals, Pre Security and Cyber Security 101.<br/><b>Penetration-testing methodology:</b> learning through the Jr Penetration Tester path, with testing limited to authorized environments.<br/><b>Security education:</b> continued development in explaining security concepts, supported by the CCEP certificate.')
text('CERTIFICATES &amp; COMPLETED LEARNING','CVHeading')
text('<b>Certified Cybersecurity Educator Professional (CCEP)</b><br/>Red Team Leaders | Exam completion | 24 December 2025')
text('<b>TryHackMe learning-path completion certificates</b><br/>Jr Penetration Tester | 15 May 2025<br/>Web Fundamentals | 14 May 2025<br/>Cyber Security 101 | 13 May 2025<br/>Pre Security | 30 April 2025')
text('Original certificates are available on the portfolio and display the issued name "Prasan gurung".','CVSmall')
text('PERSONAL PROJECT','CVHeading')
text('<b>Interactive cybersecurity portfolio</b> | 2026<br/>Static website combining education, certificate downloads and contact information. Includes a browser-based terminal simulation, virtual text files, a globe and responsive layouts.<br/><b>Implementation:</b> TypeScript, Vite, vanilla CSS, SVG and Canvas 2D. Developed with AI assistance.<br/><b>Source:</b> <a href="https://github.com/kali-guru/prashant-portfolio">github.com/kali-guru/prashant-portfolio</a>')
text('CAREER DIRECTION','CVHeading')
text('Interested in cybersecurity internships, junior security roles and IT support opportunities that provide practical experience and mentorship.')
SimpleDocTemplate(str(root/'public/Prashant-Gurung-CV.pdf'),pagesize=(595.28,841.89),rightMargin=44,leftMargin=44,topMargin=39,bottomMargin=34,title='Prashant Gurung - Cybersecurity Student CV',author='Prashant Gurung').build(story)
