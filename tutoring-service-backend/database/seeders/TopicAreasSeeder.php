<?php

namespace Database\Seeders;

use App\Models\TopicArea;
use App\Models\TutoringSubject;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TopicAreasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tutoringSubject = TutoringSubject::where('title', 'Web-Entwicklung')->first();
        $tutoringSubject1 = TutoringSubject::where('title', 'Jazz Gitarre')->first();
        $tutoringSubject2 = TutoringSubject::where('title', 'Mathematik')->first();
        $tutoringSubject3 = TutoringSubject::where('title', 'Blues Gitarre')->first();
        $tutoringSubject4 = TutoringSubject::where('title', 'Philosophie')->first();

        $tutor1 = User::where('email', 'snoopy.dog@user.com')->first();
        $tutor2 = User::where('email', 'schroeder.piano@user.com')->first();

        // Topic Areas for Web-Entwicklung
        $topicArea = new TopicArea();
        $topicArea->tutoringSubject()->associate($tutoringSubject);
        $topicArea->tutor()->associate($tutor1);
        $topicArea->title = 'HTML';
        $topicArea->slug = Str::slug($topicArea->title); // generate slug from title, chatgpt
        $topicArea->description = 'HTML ist die Grundlage jeder Webseite. Es ist wichtig, die Struktur einer Webseite zu verstehen.';
        $topicArea->save();

        $topicArea1 = new TopicArea();
        $topicArea1->tutoringSubject()->associate($tutoringSubject);
        $topicArea1->tutor()->associate($tutor1);
        $topicArea1->title = 'CSS';
        $topicArea1->slug = Str::slug($topicArea1->title);
        $topicArea1->description = 'CSS ist wichtig, um das Design einer Webseite zu gestalten. Es ist wichtig, die Grundlagen von CSS zu verstehen.';
        $topicArea1->save();

        $topicArea2 = new TopicArea();
        $topicArea2->tutoringSubject()->associate($tutoringSubject);
        $topicArea2->tutor()->associate($tutor1);
        $topicArea2->title = 'JavaScript';
        $topicArea2->slug = Str::slug($topicArea2->title);
        $topicArea2->description = 'JavaScript ist wichtig, um interaktive Webseiten zu erstellen. Es ist wichtig, die Grundlagen von JavaScript zu verstehen.';
        $topicArea2->save();

        $topicArea3 = new TopicArea();
        $topicArea3->tutoringSubject()->associate($tutoringSubject);
        $topicArea3->tutor()->associate($tutor1);
        $topicArea3->title = 'PHP';
        $topicArea3->slug = Str::slug($topicArea3->title);
        $topicArea3->description = 'PHP ist wichtig, um serverseitige Webseiten zu erstellen. Es ist wichtig, die Grundlagen von PHP zu verstehen.';
        $topicArea3->save();

        $topicArea4 = new TopicArea();
        $topicArea4->tutoringSubject()->associate($tutoringSubject);
        $topicArea4->tutor()->associate($tutor1);
        $topicArea4->title = 'Laravel';
        $topicArea4->slug = Str::slug($topicArea4->title);
        $topicArea4->description = 'Laravel ist ein PHP-Framework, das die Entwicklung von Webanwendungen erleichtert. Es ist wichtig, die Grundlagen von Laravel zu verstehen.';
        $topicArea4->save();

        // Topic Areas for Jazz Gitarre
        $topicArea5 = new TopicArea();
        $topicArea5->tutoringSubject()->associate($tutoringSubject1);
        $topicArea5->tutor()->associate($tutor2);
        $topicArea5->title = 'Melodienbau im Jazz';
        $topicArea5->slug = Str::slug($topicArea5->title);
        $topicArea5->description = 'Melodienbau im Jazz ist wichtig, um die Grundlagen des Jazz zu verstehen. Es ist wichtig, die Grundlagen des Melodienbaus zu verstehen.';
        $topicArea5->save();

        $topicArea6 = new TopicArea();
        $topicArea6->tutoringSubject()->associate($tutoringSubject1);
        $topicArea6->tutor()->associate($tutor2);
        $topicArea6->title = 'Akkordprogression';
        $topicArea6->slug = Str::slug($topicArea6->title);
        $topicArea6->description = 'Akkordprogression ist wichtig, um die Grundlagen des Jazz zu verstehen. Es ist wichtig, die Grundlagen der Akkordprogression zu verstehen.';
        $topicArea6->save();

        $topicArea7 = new TopicArea();
        $topicArea7->tutoringSubject()->associate($tutoringSubject1);
        $topicArea7->tutor()->associate($tutor2);
        $topicArea7->title = 'Jazz Harmonielehre';
        $topicArea7->slug = Str::slug($topicArea7->title);
        $topicArea7->description = 'Durch gezielte Übungen in der Jazz Harmonielehre lernen Musiker, komplexe Harmonien zu verstehen und anzuwenden. Dies ist entscheidend für das Spielen von Jazzmusik.';
        $topicArea7->save();

        $topicArea8 = new TopicArea();
        $topicArea8->tutoringSubject()->associate($tutoringSubject1);
        $topicArea8->tutor()->associate($tutor2);
        $topicArea8->title = 'Geschichte des Jazz';
        $topicArea8->slug = Str::slug($topicArea8->title);
        $topicArea8->description = 'Von den Anfängen des Jazz bis zu modernen Entwicklungen ist die Geschichte des Jazz ein faszinierendes Thema. In diesem Kurs werden die wichtigsten Epochen und Stile des Jazz behandelt.';
        $topicArea8->save();

        $topicArea9 = new TopicArea();
        $topicArea9->tutoringSubject()->associate($tutoringSubject1);
        $topicArea9->tutor()->associate($tutor2);
        $topicArea9->title = 'Comping-Techniken';
        $topicArea9->slug = Str::slug($topicArea9->title);
        $topicArea9->description = 'In diesem Kurs werden verschiedene Comping-Techniken für Jazz-Gitarristen behandelt. Diese Techniken sind wichtig, um den Rhythmus und die Harmonie im Jazz zu unterstützen.';
        $topicArea9->save();

        $topicArea10 = new TopicArea();
        $topicArea10->tutoringSubject()->associate($tutoringSubject1);
        $topicArea10->tutor()->associate($tutor2);
        $topicArea10->title = 'Free Jazz';
        $topicArea10->slug = Str::slug($topicArea10->title);
        $topicArea10->description = 'Free Jazz ist eine avantgardistische Form des Jazz, die sich durch Improvisation und Experimentierfreude auszeichnet. In diesem Kurs werden die Grundlagen des Free Jazz vermittelt.';
        $topicArea10->save();

        $topicArea11 = new TopicArea();
        $topicArea11->tutoringSubject()->associate($tutoringSubject1);
        $topicArea11->tutor()->associate($tutor2);
        $topicArea11->title = 'Jazz Improvisation';
        $topicArea11->slug = Str::slug($topicArea11->title);
        $topicArea11->description = 'Improvisation dient dazu, die Kreativität im Jazz zu fördern. Dabei geht es darum, spontan zu spielen und neue Ideen zu entwickeln.';
        $topicArea11->save();

        // Topic Areas for Mathematik
        $topicArea12 = new TopicArea();
        $topicArea12->tutoringSubject()->associate($tutoringSubject2);
        $topicArea12->tutor()->associate($tutor1);
        $topicArea12->title = 'Analysis';
        $topicArea12->slug = Str::slug($topicArea12->title);
        $topicArea12->description = 'Analysis ist wichtig, um die Grundlagen der Mathematik zu verstehen. Es ist wichtig, die Grundlagen der Analysis zu verstehen.';
        $topicArea12->save();

        $topicArea13 = new TopicArea();
        $topicArea13->tutoringSubject()->associate($tutoringSubject2);
        $topicArea13->tutor()->associate($tutor1);
        $topicArea13->title = 'Algebra';
        $topicArea13->slug = Str::slug($topicArea13->title);
        $topicArea13->description = 'Bei Algebra geht es um die Manipulation von Symbolen und Variablen. Dabei werden Gleichungen und Formeln verwendet, um mathematische Probleme zu lösen.';
        $topicArea13->save();

        // Topic Areas for Blues Gitarre
        $topicArea14 = new TopicArea();
        $topicArea14->tutoringSubject()->associate($tutoringSubject3);
        $topicArea14->tutor()->associate($tutor2);
        $topicArea14->title = 'Blues Skalen';
        $topicArea14->slug = Str::slug($topicArea14->title);
        $topicArea14->description = 'Durch das Erlernen der Blues Skalen können Musiker die charakteristischen Klänge des Blues erzeugen. Diese Skalen sind eine wichtige Grundlage für das Spielen von Bluesmusik.';
        $topicArea14->save();

        $topicArea15 = new TopicArea();
        $topicArea15->tutoringSubject()->associate($tutoringSubject3);
        $topicArea15->tutor()->associate($tutor2);
        $topicArea15->title = 'Improvisationstechniken';
        $topicArea15->slug = Str::slug($topicArea15->title);
        $topicArea15->description = 'Improvisationstechniken sind wichtig, um die Kreativität im Blues zu fördern. Dabei geht es darum, spontan zu spielen und neue Ideen zu entwickeln.';
        $topicArea15->save();

        $topicArea16 = new TopicArea();
        $topicArea16->tutoringSubject()->associate($tutoringSubject3);
        $topicArea16->tutor()->associate($tutor2);
        $topicArea16->title = 'Rhythmus und Timing';
        $topicArea16->slug = Str::slug($topicArea16->title);
        $topicArea16->description = 'Rhythmus und Timing sind entscheidend für das Spielen von Bluesmusik. Es ist wichtig, den Rhythmus zu verstehen und das Timing zu beherrschen.';
        $topicArea16->save();

        $topicArea17 = new TopicArea();
        $topicArea17->tutoringSubject()->associate($tutoringSubject3);
        $topicArea17->tutor()->associate($tutor2);
        $topicArea17->title = 'Blues Harmonielehre';
        $topicArea17->slug = Str::slug($topicArea17->title);
        $topicArea17->description = 'Mittels Blues Harmonielehre lernen Musiker die Struktur und Progressionen von Bluesakkorden. Dies ist wichtig, um die musikalische Basis des Blues zu verstehen.';
        $topicArea17->save();

        // Topic Areas for Philosophie
        $topicArea18 = new TopicArea();
        $topicArea18->tutoringSubject()->associate($tutoringSubject4);
        $topicArea18->tutor()->associate($tutor1);
        $topicArea18->title = 'Einführung in die Philosophie';
        $topicArea18->slug = Str::slug($topicArea18->title);
        $topicArea18->description = 'Philosophie ist die Untersuchung grundlegender Fragen des Lebens, der Existenz und des Wissens. Es ist wichtig, die Grundlagen der Philosophie zu verstehen.';
        $topicArea18->save();

        $topicArea19 = new TopicArea();
        $topicArea19->tutoringSubject()->associate($tutoringSubject4);
        $topicArea19->tutor()->associate($tutor1);
        $topicArea19->title = 'Ethik';
        $topicArea19->slug = Str::slug($topicArea19->title);
        $topicArea19->description = 'Ethik ist ein wichtiger Bereich der Philosophie, der sich mit moralischen Fragen und dem richtigen Handeln beschäftigt. Es ist wichtig, die Grundlagen der Ethik zu verstehen.';
        $topicArea19->save();
    }
}
