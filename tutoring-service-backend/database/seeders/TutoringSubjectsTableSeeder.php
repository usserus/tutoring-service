<?php

namespace Database\Seeders;

use App\Models\TutoringSubject;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class TutoringSubjectsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $tutor = User::where('email', 'snoopy.dog@user.com')->first();
        $tutor2 = User::where('email', 'schroeder.piano@user.com')->first();

        $tutoringSubject = new TutoringSubject();
        $tutoringSubject->tutor()->associate($tutor);
        $tutoringSubject->title = 'Web-Entwicklung';
        $tutoringSubject->slug = Str::slug($tutoringSubject->title); // generate slug from title, chatgpt
        $tutoringSubject->description = 'In dieser Lehrveranstaltung lernen Sie die Grundlagen der Web-Entwicklung mit HTML, CSS und JavaScript, sowie die Verwendung von Frameworks wie React und Angular.';
        $tutoringSubject->save();

        $tutoringSubject1 = new TutoringSubject();
        $tutoringSubject1->tutor()->associate($tutor2);
        $tutoringSubject1->title = 'Jazz Gitarre';
        $tutoringSubject1->slug = Str::slug($tutoringSubject1->title);
        $tutoringSubject1->description = 'Dieser Kurs eröffnet ein facettenreiches Panorama der Jazzgitarre mit Modulen zu Stilistik, Geschichte, Improvisation und freiem Spiel. Ziel ist es, ein vertieftes Verständnis für Ausdruck, Kontext und Technik im Jazzgitarrenspiel zu entwickeln.';
        $tutoringSubject1->save();

        $tutoringSubject2 = new TutoringSubject();
        $tutoringSubject2->tutor()->associate($tutor);
        $tutoringSubject2->title = 'Mathematik';
        $tutoringSubject2->slug = Str::slug($tutoringSubject2->title);
        $tutoringSubject2->description = 'Die Lehrveranstaltung vermittelt zentrale Konzepte der Mathematik anhand der beiden Grundpfeiler Analysis und Algebra. Ziel ist ein tiefes Verständnis grundlegender Strukturen, Rechenmethoden und theoretischer Zusammenhänge – von Grenzwerten bis Gruppen.';
        $tutoringSubject2->save();

        $tutoringSubject3 = new TutoringSubject();
        $tutoringSubject3->tutor()->associate($tutor2);
        $tutoringSubject3->title = 'Blues Gitarre';
        $tutoringSubject3->slug = Str::slug($tutoringSubject3->title);
        $tutoringSubject3->description = 'Der Kurs bietet einen praxisnahen Einstieg in das Spiel auf der Blues-Gitarre. Themen sind Skalen, Improvisation, Rhythmus und grundlegende Blues-Harmonielehre.';
        $tutoringSubject3->save();

        $tutoringSubject4 = new TutoringSubject();
        $tutoringSubject4->tutor()->associate($tutor2);
        $tutoringSubject4->title = 'Philosophie';
        $tutoringSubject4->slug = Str::slug($tutoringSubject4->title);
        $tutoringSubject4->description = 'Die Lehrveranstaltung bietet eine Einführung in zentrale Fragestellungen und Methoden der Philosophie. Ein besonderer Fokus liegt auf ethischen Theorien und ihrer Anwendung auf aktuelle gesellschaftliche Herausforderungen.';
        $tutoringSubject4->save();
    }
}
